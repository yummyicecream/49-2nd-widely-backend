const express = require('express');
const { asyncWrap } = require('../utils');
const { productController } = require('../controllers');
const productRouter = express.Router();

productRouter.get('/:id', productController.viewProduct);
productRouter.get('/categories/:categoryId', asyncWrap(productController.viewByCategory));
productRouter.get('/', productController.viewMain);

module.exports = { productRouter };
