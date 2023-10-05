const { throwError } = require('../utils');
const { orderService }  = require('../services');
const { orderForm, createOrder, createDeliveryAddress, deleteDeliveryAddress} = orderService;

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
   
    const orderData = await createOrder(id, addressId, zipcode, address1, address2, usedPoint, paymentId, deliveryFee, totalOrderAmount)

    return res.status(202).json({
        message : "Order success",
        data : {
            orderNumber : orderData.orderNumber,
            deliveryFee : orderData.deliveryFee,
            totalOrderAmount : orderData.totalOrderAmount
    },
})
}

const postAddress = async(req, res) => {
    const { id } = req.loginUser;
    const { addressName, recipientName, phoneNumber, zipcode, address1, address2 } = req.body;

    //키에러 체크
    if ( !addressName || !recipientName || !phoneNumber || !zipcode || !address1) {
        throwError(400, 'Key error');
    }

    const addressData = await createDeliveryAddress(id, addressName, recipientName, phoneNumber, zipcode, address1, address2)

    return res.status(201).json({
        message : "Add success",
        data : addressData
    })
}

const deleteAddress = async(req, res) => {

    const { id } = req.loginUser;
    const { addressId } = req.params;

    await deleteDeliveryAddress(id, addressId)

    return res.status(201).json({
        message : "Delete success"
    })
}

module.exports = { getOrder, postOrder, postAddress, deleteAddress }