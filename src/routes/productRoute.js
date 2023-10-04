const express = require('express');
const { asyncWrap } = require('../utils');
const { productController } = require('../controllers');
const productRouter = express.Router();

productRouter.get('/:id', productController.viewProduct);
productRouter.get('/', asyncWrap(productController.viewByCategory));
productRouter.get('/main', productController.viewMain);
console.log('@@@@@@@@@@');
module.exports = { productRouter };
