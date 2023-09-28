const express = require('express');

const { productRouter } = require('./productRoute');
const { searchRouter } = require('./searchRoute');

const routes = express.Router();
routes.use('/products', productRouter);
routes.use('/categories', productRouter);
routes.use('/main', productRouter);
routes.use('/search', searchRouter);
module.exports = { routes };
