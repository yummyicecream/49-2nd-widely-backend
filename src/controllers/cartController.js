const { cartServices } = require('../services');
const { throwError } = require('../utils')

const insertCartController = async(req, res) => {
    try{
    const { id } = req.loginUser
    const { productId, productQty } = req.body

    if(!id) throwError(400, 'Key error uid');
    if(!productId) throwError(400, 'Key error uid');
    if(!productQty) throwError(400, 'Key error uid');

    return res.status(200).json({
        message : "Insert success",
        data : await cartServices.insertCartServices(id, productId, productQty)
    })
    } catch (err) {
      console.error(err);
      throwError(400, "Insert error")
    }
}

const getCartController = async(req, res) => {
    try{
    const {id} = req.loginUser
    const cartList = await cartServices.getCartServices(id)
    if(!id) throwError(400,'Key error');
    return res.status(200).json({
        data : cartList,
        message : "Read success"
    })
    }catch (err) {
        console.error(err);
        throwError(400, "Read error")
    }
}

const deleteCartController = async(req, res) => {
    try{
    const {id} = req.loginUser
    const productId = req.body
    if(!id) throwError(400, 'Key error');
    if(!productId) throwError(400, 'Key error');
    

    return res.status(200).json({
        message : "Delete success",
        data : await cartServices.deleteCartServices(id, productId)
    })
    }catch(err) {
        console.error(err);
        throwError(400, 'Delete error')
    }
}

module.exports = {
    insertCartController,
    getCartController,
    deleteCartController
}