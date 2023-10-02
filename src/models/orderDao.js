const { AppDataSource } = require('./data-source');

const createCartInfo = async (id) => {
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

const createUserInfo = async(id) => {
   
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

const createPaymentInfo = async() => {
    const paymentInfo = await AppDataSource.query(
    `SELECT * FROM payments`
    )
    return paymentInfo
}


module.exports = { createCartInfo, createUserInfo, createPaymentInfo };