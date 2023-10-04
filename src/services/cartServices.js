const { cartDao } = require('../models');

// 장바구니 추가
const insertCartServices = async(userId, productId, productQty) => {
    
    const statusId = 1;
    return await cartDao.insertCart(userId, productId, productQty, statusId)

};

// 장바구니 조회
const getCartServices = async(userId) => {
    const cartInfo = await cartDao.getCartList(userId);
    console.log(cartInfo)
    return cartInfo;
};

// 장바구니 삭제
const deleteCartServices = async(userId, productId) => {
    await cartDao.deleteCart(userId, productId);
};

module.exports = {
    insertCartServices,
    getCartServices,
    deleteCartServices
}