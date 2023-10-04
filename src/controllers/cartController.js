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

const checkBoxController = async(req, res) => {
    try{
        const {id} = req.loginUser;
        const {cartId, statusId} = req.query;
        if(!cartId || !statusId) throwError(400, "Key error");
        const cartCheck = await cartServices.checkBoxServices(id, cartId, statusId);
        return res.status(200).json({
            message : "Check success",
            data : cartCheck
        })
    } catch(err) {
        console.error(err);
        throwError(400, "Check error")
    }
}

const updateCartController = async(req, res) => {
    try{
        const {id} = req.loginUser;
        const { productQty, productId } = req.query;
        if(!productId || !productQty) throwError(400, "Update error");
        const cartUpdate = await cartServices.updateCartServices(productQty, id, productId)
        return res.status(200).json({
            message : "Update success",
            data : cartUpdate
        })
    } catch (error) {
        console.error(err);
        throwError(400, "Update error")
    }
}

const deleteCartController = async(req, res) => {
    try{
    const {id} = req.loginUser
    if(!id) throwError(400, 'Key error');

    return res.status(200).json({
        message : "Delete success",
        data : await cartServices.deleteCartServices(id)
    })
    }catch(err) {
        console.error(err);
        throwError(400, 'Delete error')
    }
}

const selectDelteteController = async(req, res) => {
    try{
        const {id} = req.loginUser
        const { productId } = req.query;

        const selectDelete = await cartServices.selectDeleteServices(id, productId)
        if(!id || !productId) throwError(400, 'Delete key error');
        return res.status(200).json({
            message : "Selectdelete success",
            data : selectDelete
        })
    } catch(err) {
        console.error(err);
        throwError(400, "Selectdelete error")
    }
}

module.exports = {
    insertCartController,
    getCartController,
    updateCartController,
    deleteCartController,
    selectDelteteController
}