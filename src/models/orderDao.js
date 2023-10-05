const { throwError } = require('../utils');
const { AppDataSource } = require('./data-source');
const { createConnection } = require('typeorm');


const getCartInfo = async (id) => {
    const cartInfo = await AppDataSource.query(
        `
        SELECT
            b.name,
            b.price,
            a.product_qty,
            a.user_id
        FROM
            carts a
        INNER JOIN products b ON a.product_id = b.id
        WHERE
            a.status_id = 1
        AND a.user_id = ?
        `,
        [id]
    )

    return cartInfo;

}
const getUserInfo = async (id) => {

    const userInfo = await AppDataSource.query(
        `
    SELECT
        a.id,
        a.name,
        a.zipcode,
        a.address1,
        a.address2,
        a.phone_number,
        a.email,
        b.point
    FROM
        users a
    INNER JOIN points b ON a.user_point = b.id
    WHERE
        a.id = ?
    `,
        [id]
    )
    
    return userInfo;
}
const getDeliveryAddressInfo = async (id) => {
    
    const addressInfo = await AppDataSource.query(
        `SELECT
             id,
             address_name,
             recipient_name,
             phone_number,
             zipcode,
             address1,
             address2
        FROM delivery_address
        WHERE user_id = ? 
        `,
        [id]
    )

    return addressInfo;
}
const getPaymentInfo = async () => {
  
    const paymentInfo = await AppDataSource.query(
        `SELECT * FROM payments`
    )
    return paymentInfo
}
const findByOrderNumber = async (orderNumber) => {
   
    const [checkOrderNumberDuplicate] = await AppDataSource.query(
        `SELECT COUNT(*) as count
         FROM user_orders 
         WHERE order_number = ? 
        `, 
        [orderNumber]
    )
    return checkOrderNumberDuplicate.count > 0; //존재하면 ture
}
const createOrderData = async (
    id,
    orderNumber,
    addressId,
    zipcode,
    address1,
    address2,
    usedPoint,
    paymentId,
    orderStatus,
    deliveryFee,
    totalOrderAmount) => {

    const connection = await createConnection();
    const entityManager = connection.createEntityManager();

    try {
        // 트랜잭션 시작
        await entityManager.transaction(async transactionalEntityManager => {

            // 1. user_order 입력
            const createUserOrder = await transactionalEntityManager.query(
                `INSERT INTO user_orders 
                (user_id, order_number, address_id, zipcode, address1, address2, 
                payment_id, order_status, delivery_fee, total_order_amount )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `
                , [id, orderNumber, addressId, zipcode, address1, address2,
                    paymentId, orderStatus, deliveryFee, totalOrderAmount]
            );

            // 2. order_detail 입력
            const [lastInsertIdResult] = await transactionalEntityManager.query(`SELECT LAST_INSERT_ID() as id`);
            let lastInsertId = lastInsertIdResult.id;

            const getOrderCart = await transactionalEntityManager.query(
                `SELECT 
               c. product_id, 
               c. product_qty,
               p. price
            FROM carts c
            INNER JOIN products p ON c.product_id = p.id
            WHERE
                 c.status_id = 1
            AND c.user_id = ?
            `,
                [id]
            );

            if (!getOrderCart) {
                throwError(500, 'Failed to fetch cart items');
            };

            for (const cartItem of getOrderCart) {
                const productId = cartItem.product_id;
                const productCount = cartItem.product_qty;
                const productPrice = cartItem.price;

                const createOrderDetail = await transactionalEntityManager.query(
                    `INSERT INTO order_details
                      (order_id, product_id, product_count, product_price)
                  VALUES (?, ?, ?, ?)
                 `,
                    [lastInsertId, productId, productCount, productPrice]
                )
            };

            // 3. carts status_id 변경
            const modifyOrderStatus = await transactionalEntityManager.query(
                `UPDATE carts
             SET status_id = 3
             WHERE status_id = 1 
             AND user_id = ?
             `,
                [id]
            );

            // 4. 포인트 차감
            if (usedPoint) {
                const getUserPoint = await transactionalEntityManager.query(
                    `SELECT point FROM points WHERE user_id = ?`,
                    [id]
                );

                const userPoint = getUserPoint[0].point;
                const updatedUserPoint = userPoint - usedPoint;

                if (updatedUserPoint >= 0) {

                    const modifyUserPoint = await transactionalEntityManager.query(
                        `UPDATE points SET point = ? WHERE user_id = ?`,
                        [updatedUserPoint, id]
                    );
                } else {
                    throwError(400, 'Insufficient points')
                };
            };
        });

    } catch (err) {
        // 롤백 및 에러 처리
        console.error(err);
        throwError(400, 'Failed to create order in Dao');
    } finally {
        // 연결 닫기 
        await connection.close();
    }
    // 성공적으로 주문이 처리됐을 경우 반환
    return { orderNumber, deliveryFee, totalOrderAmount };
}
const createAddress = async (
    id,
    addressName,
    recipientName,
    phoneNumber,
    zipcode,
    address1,
    address2
    ) => {

    const addDeliveryAddress = await AppDataSource.query(
        `
         INSERT INTO delivery_address
         (user_id, address_name, recipient_name, phone_number, zipcode, address1, address2)
         VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [id, addressName, recipientName, phoneNumber, zipcode, address1, address2 ]
    )

    return { addressName, recipientName, phoneNumber, zipcode, address1, address2 };

}
const deleteAddress = async (id, addressId) => {
    
    const deleteAddressData = await AppDataSource.query(
        `DELETE FROM delivery_address
        WHERE user_id = ? 
        AND id = ?
        `,
        [id, addressId]
    )

    // deleteAddressData가 null 또는 빈 배열이면 에러 처리
    if (!deleteAddressData || deleteAddressData.affectedRows === 0) {
        throwError(400, 'Invalid address id');
    }
}

module.exports = { getCartInfo, getUserInfo, getDeliveryAddressInfo, 
    getPaymentInfo, createOrderData, findByOrderNumber, createAddress, deleteAddress };