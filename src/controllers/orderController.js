const { throwError } = require('../utils');
const { orderService } = require('../services');
const { orderForm, createOrder } = orderService;

const getOrder = async (req, res) => {
    const { id } = req.loginUser
    const orderInfo = await orderForm(id)
    
    return res.status(200).json({
        message: "Read success",
        data: orderInfo,
    })
}

const putOrder = async(req, res) => {
    const { id }= req.loginUser
    const { zipcode, address1, address2, usedPoint, paymentId, deliveryFee, totalOrderAmount } = req.body;
    /*결제수단 선택 안했으면 payment_id = 1 / order_status, 디폴트로 1 (결제완료) */
    
    
    
    return res.status(200).json({
        message : "Order success"
    })
}

const getOrderResult = async(req, res) => {

}

module.exports = { getOrder, putOrder, getOrderResult }