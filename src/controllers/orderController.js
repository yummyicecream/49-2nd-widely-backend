const { throwError } = require('../utils');
const { orderService }  = require('../services');
const { orderForm, createOrder, orderResult } = orderService;

const getOrder = async (req, res) => {
    const { id }  = req.loginUser
    const orderInfo = await orderForm(id)
    
    return res.status(200).json({
        message: "Read success",
        data: orderInfo,
    })
}

const postOrder = async(req, res) => {
    const { id }= req.loginUser
    const { addressId, zipcode, address1, address2, usedPoint, paymentId, deliveryFee, totalOrderAmount } = req.body;
   
   //키에러 체크
   if (!zipcode || !address1 || !deliveryFee || !totalOrderAmount) {
    throwError(400, 'Key error');
   }
   
    await createOrder(id, addressId, zipcode, address1, address2, usedPoint, paymentId, deliveryFee, totalOrderAmount)
    
    return res.status(202).json({
        message : "Order success"
    })
}

const getOrderResult = async(req, res) => {
    const {id} = req.loginUser

    return res.status(200).json({
        message : "Read success",
    })
}

module.exports = { getOrder, postOrder, getOrderResult }