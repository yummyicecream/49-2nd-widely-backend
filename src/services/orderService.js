const { throwError } = require('../utils');
const { orderDao } = require('../models');
const { createCartInfo, createUserInfo, createPaymentInfo } = orderDao;

const orderForm = async (userId) => {
    try {
        const cartInfo = await createCartInfo(userId)
        const [userInfo] = await createUserInfo(userId)
        const paymentInfo = await createPaymentInfo()

        console.log(cartInfo)

        let orderInfo = {};
        let deliveryFee = 0;

        // 장바구니 정보 
        // for...of : 배열의 각 요소나 객체의 값을 하나씩 가져옴
        for (const cartItem of cartInfo) {
   
            if (userId !== cartItem.user_id) {
                throwError(403, "Forbidden user in cart");
            }
        }

        if (cartInfo.length > 0) {
            const firstOrderName = cartInfo[0].name;
            const totalQuantity = cartInfo.reduce((sum, item) => sum + item.product_qty, 0);

            orderInfo.firstOrderName = firstOrderName;
            orderInfo.totalQuantity = totalQuantity;

            // 장바구니 총 가격 계산
            const totalPrice = cartInfo.reduce((total, item) => {
                const itemPrice = item.price * item.product_qty;
                return total + itemPrice;
            }, 0)

            // 배송비 계산
            if (totalPrice >= 20000) {
                deliveryFee = 0;
            } else {
                deliveryFee = 3000;
            }

            // 총 주문 금액 계산
            const totalOrderAmount = totalPrice + deliveryFee;
            orderInfo.totalPrice = totalPrice;
            orderInfo.deliveryFee = deliveryFee;
            orderInfo.totalOrderAmount = totalOrderAmount;

        } else {
            throwError(400, "Empty cart");
        }

        //주문자 정보
        if ( userId !== userInfo.id) throwError(403, "Forbidden user in user"); 

        if (userInfo) {
            orderInfo.name = userInfo.name;
            orderInfo.zipcode = userInfo.zipcode;
            orderInfo.address1 = userInfo.address1;
            orderInfo.address2 = userInfo.address2;
            orderInfo.phone_number = userInfo.phone_number;
            orderInfo.email = userInfo.email;
            orderInfo.point = userInfo.point;
        } else {
            throwError(400, "User information not found");
        }

        //결제수단 정보
        if (paymentInfo && paymentInfo.length > 0) {
            orderInfo.payment = paymentInfo.map(payment => ({
                paymentId: payment.id,
                paymentName: payment.name
            }));
        } else {
            throwError(400, "Payment information not found");
        }

        return orderInfo
    } catch (err) {
        console.error(err);
        throwError(400, 'Failed to get order infomation');
    }
}

// 커밋 적용하기
const createOrder = async (userId) => {

}

module.exports = { orderForm, createOrder }