const { cartDao } = require('../models');
const { throwError } = require('../utils');

// 장바구니 추가
const insertCartServices = async(userId, productId, productQty) => {
    const statusId = 1;
    await cartDao.insertCart(userId, productId, productQty, statusId)

};

// 장바구니 조회
const getCartServices = async(userId) => {
    const cartInfo = await cartDao.getCartList(userId);
    console.log(cartInfo)
    return cartInfo;
};

// 장바구니 상품 체크박스
const checkBoxServices = async(userId, cartId, statusId) => {
    return await cartDao.checkBox(userId, cartId, statusId);
}

// 수량 업데이트
const updateCartServices = async(productQty, userId, productId) => {
    const check = await cartDao.checkStock(productId);
    if ( check < productQty ) throwError (400, "Stock error");
    await cartDao.updateCart(productQty, userId, productId);
};

// 전체 삭제
const deleteCartServices = async(userId) => {
    await cartDao.deleteCart(userId);
}

// 장바구니 선택 삭제
const selectDeleteServices = async(userId, productId) => {
    await cartDao.selectDelete(userId, productId);
};

module.exports = {
    insertCartServices,
    getCartServices,
    checkBoxServices,
    updateCartServices,
    deleteCartServices,
    selectDeleteServices
}