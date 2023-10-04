const { AppDataSource } = require('./data-source');

// 장바구니 물품 추가
// 같은 물품이 있으면 하나가 더 추가되는거로 수정
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

const findByProduct = async(userId, productId) => {
    const [findByProductId] = await AppDataSource.query(`
    SELECT COUNT(*) AS count
    FROM carts 
    WHERE user_id =? AND product_id =?
    `,
    [userId, productId]
    )
    console.log(findByProductId.count)
    return findByProductId.count > 0; //전달받은 product_id 가 존재하는지, 존재한다면 ture 반환
}

const plusQty = async(userId, productId, productQty) => {
    const plusQty = await AppDataSource.query(`
    UPDATE carts
    SET product_qty = product_qty + ? WHERE user_id= ? AND product_id =?
    `,
    [productQty, userId, productId]
    );
    return plusQty
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

// 장바구니 체크박스
const checkBox = async(userId ,cartId, statusId) => {
    await AppDataSource.query(`
    UPDATE carts
    SET status_id = ?
    WHERE user_id =? AND id =?
    `,
    [statusId, userId, cartId]
    )
}

// 상품 수량 체크
const checkStock = async(productId) => {
    const check = await AppDataSource.query(`
    SELCET stock
    FROM products p WHERE p.id =?
    `,
    [productId]
    );
    return check;
} 

// 장바구니 수량 수정
const updateCart = async(productQty, userId, productId) => {
    const result = await AppDataSource.query(`
    UPDATE carts 
    SET product_qty =?
    WHERE user_id =? AND product_id =?
    `,
    [productQty, userId, productId])

    return result;
}

// 장바구니 전체 삭제
const deleteCart = async(userId) => {
    const allDelete = await AppDataSource.query(`
    DELETE FROM carts
    WHERE user_id =?
    `,
    [userId]);
    return allDelete;
};

// 선택 삭제
const selectDelete = async(userId, productId) => {
    const selectDelete = await AppDataSource.query(`
    DELETE FROM carts 
    WHERE user_id =? AND product_id =?
    `,
    [userId, productId]
    )
    return selectDelete;
}


module.exports = {
    insertCart,
    getCartList,
    plusQty,
    checkBox,
    checkStock,
    updateCart,
    deleteCart,
    selectDelete,
    findByProduct
};