const express = require('express');
const { validateToken } = require('../middlewares');
const { asyncWrap } = require('../utils');
const { cartController } = require('../controllers');
const cartRouter = express.Router();

cartRouter.get('', validateToken, asyncWrap(cartController.getCartController));
cartRouter.post('', validateToken, asyncWrap(cartController.insertCartController));
cartRouter.put('/update', validateToken, asyncWrap(cartController.updateCartController));
cartRouter.delete('/all', validateToken, asyncWrap(cartController.deleteCartController));
cartRouter.delete('/select', validateToken, asyncWrap(cartController.selectDelteteController));

module.exports = cartRouter ;