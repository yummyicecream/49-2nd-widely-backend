const { AppDataSource } = require('./data-source');

// 장바구니 물품 추가
const insertCart = async (userId, productId, productQty, statusId) => {
    await AppDataSource.query(`
    INSERT INTO carts(
        user_id,
        product_id,
        product_qty,
        status_id
    ) VALUES(
        ?,
        ?,
        ?,
        ?
    );
    `,
    [userId, productId, productQty, statusId]
    );
};

// read
const getCartList = async(userId) => {
    
    const cartInfo = await AppDataSource.query(`
    SELECT 
        c.product_id AS productId,
        i.image AS image,
        p.name AS product_name,
        c.product_qty AS count,
        p.price,
        (c.product_qty * p.price) AS totalPrice
    FROM carts c
    JOIN users u ON c.user_id = u.id
    JOIN products p ON c.product_id = p.id
    JOIN product_images i ON i.product_id = p.id
    WHERE c.status_id = 1 AND i.is_thumbnail = 1 AND c.user_id = ?
    `,
    [userId]
    );
    return cartInfo
};

// 장바구니 수량 수정
// const updateCart = async()

// 장바구니 전체 삭제
const deleteCart = async(userId, productId) => {
    await AppDataSource.query(`
    DELETE FROM carts
    WHERE user_id =? AND product_id =?
    `,
    [userId, productId]);
};


module.exports = {
    insertCart,
    getCartList,
    deleteCart
};