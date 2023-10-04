const { throwError } = require('../utils');
const { AppDataSource } = require('./data-source');

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
    console.log("userInfo : ", userInfo)

    return userInfo;
}

const getPaymentInfo = async () => {
    const paymentInfo = await AppDataSource.query(
        `SELECT * FROM payments`
    )
    return paymentInfo
}

const findByOrderNumber = async (orderNumber) => {
    const isOrderNumberDuplicate = await AppDataSource.query(
        `SELECT order_number 
         FROM user_orders 
         WHERE order_number = ? `
        , [orderNumber]
    )
    return isOrderNumberDuplicate;
}

//트랜젝션 적용하기
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
    const connection = await AppDataSource.getConnection();

    try {
        // 트랜잭션 시작
        await connection.beginTransaction();

        // 1. user_order 입력
        const createUserOrder = await connection.query(
            `INSERT INTO user_orders 
                (user_id, order_number, address_id, zipcode, address1, address2, paymentId, order_status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `
            , [id, orderNumber, addressId, zipcode, address1, address2, usedPoint, paymentId, orderStatus]
        );

        const [lastInsertIdResult] = await AppDataSource.query(`SELECT LAST_INSERT_ID() as id`);
        let lastInsertId = lastInsertIdResult.id;
  
        const getOrderCart = await connection.query(
            `SELECT 
                product_id, 
                product_count,
                product_price
            FROM carts
            WHERE
                 a.status_id = 1
            AND a.user_id = ?
            `,
            [id]
        )

        const productId = getOrderCart.product_id;
        const productCount = getOrderCart.product_count;
        const productPrice = getOrderCart.product_price;

        // 2. order_detail 입력
        const createOrderDetail = await connection.query(
            `INSERT INTO order_detail
                (order_id, product_id, product_count, product_price, delivery_fee)
                VALUES (? , ?, ?, ?, ?)
            `,
            [lastInsertId, productId, productCount, productPrice]
        )

        // 3. carts status_id 변경

        // 4. 포인트 차감


        //커밋
        await connection.commit()
        //트랜잭션 종료
        connection.release();
        // 성공적으로 주문이 처리됐을 경우 반환
        return 'Order placed successfully';

    } catch (err) {
        // 롤백 및 에러 처리
        await connection.rollback();
        console.error(err);
        throwError(400, 'Failed to create order in Dao');
    }

}




module.exports = { getCartInfo, getUserInfo, getPaymentInfo, createOrderData, findByOrderNumber };