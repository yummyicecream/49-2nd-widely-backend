const express = require('express');
const { asyncWrap } = require('../utils');
const { productController } = require('../controllers');
const productRouter = express.Router();

productRouter.get('/', asyncWrap(productController.viewByCategory));
productRouter.get('/main', productController.viewMain);
productRouter.get('/:id', productController.viewProduct);

module.exports = { productRouter };
