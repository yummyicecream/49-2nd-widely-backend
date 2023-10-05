const { throwError } = require('../utils');
const { orderDao } = require('../models');
const { getCartInfo, getUserInfo, getDeliveryAddressInfo, 
    getPaymentInfo, findByOrderNumber, createOrderData, createAddress } = orderDao;

const orderForm = async (userId) => {
    try {
        const cartInfo = await getCartInfo(userId)
        const [userInfo] = await getUserInfo(userId)
        const adreessInfo = await getDeliveryAddressInfo(userId)
        const paymentInfo = await getPaymentInfo()

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
        if (userId !== userInfo.id) throwError(403, "Forbidden user in user");

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

        // 배송지 정보
        if (adreessInfo && adreessInfo.length > 0) {
            orderInfo.address = adreessInfo.map(address => ({
                addressId : address.id,
                addressName : address.address_name,
                recipientName : address.recipient_name,
                phoneNumber: address.phone_number,
                zipcode : address.zipcode,
                address1: address.address1,
                address2: address.address2

            }))
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

const createOrder = async (id, addressId, zipcode, address1, address2, usedPoint, paymentId, deliveryFee, totalOrderAmount) => {
    try {

        // 구매 수단을 지정하지 않으면 1(포인트)로 설정
        if (paymentId === null) {
            paymentId = 1
        }

        //order_statuss는 기본값 1(결제 완료)
        const orderStatus = 1;

        //orderNumber가 중복되지 않을 때까지 반복
        let orderNumber = null;
        let isOrderNumberDuplicate = true;

        while (isOrderNumberDuplicate) { // true라면 반복
            // 현재 날짜 포맷 (20231002)
            const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
            // 2자리 랜덤 숫자 생성
            const randomDigits = Math.floor(Math.random() * 100).toString().padStart(2, "0");
            orderNumber = parseInt(`${currentDate}${id}${randomDigits}`);
            // 주문번호 중복 확인
            isOrderNumberDuplicate = await findByOrderNumber(orderNumber);
        }

        // 주문번호가 중복되지 않을 때 주문 생성
        const orderData = await createOrderData(
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
            totalOrderAmount,
        );

        return orderData;

    } catch (err) {
        console.log(err);
        throwError(400, 'Failed to create order');
    }
}

const createDeliveryAddress = async ( id, addressName, recipientName, phoneNumber, zipcode, address1, address2 ) => {

    try {
        const addedAddress = await createAddress ( id, addressName, recipientName, phoneNumber, zipcode, address1, address2)
      
        return addedAddress;

    } catch(err) {
        console.log(err);
        throwError(400, 'Failed to add delivery address')
    }
}

module.exports = { orderForm, createOrder, createDeliveryAddress }