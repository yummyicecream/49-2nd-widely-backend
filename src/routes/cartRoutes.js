const express = require('express');
const { validateToken } = require('../middlewares');
const { asyncWrap } = require('../utils');
const { cartController } = require('../controllers');
const cartRouter = express.Router();

cartRouter.get('/', validateToken, asyncWrap(cartController.getCartController));
cartRouter.post('/', validateToken, asyncWrap(cartController.insertCartController));
cartRouter.delete('/', validateToken, asyncWrap(cartController.deleteCartController));

module.exports = cartRouter ;