const express = require('express');
const userRouter = require('./userRouter');
const cartRouter = require('./cartRoutes');
const { productRouter } = require('./productRoute');
const { searchRouter } = require('./searchRoute');
const routes = express.Router();

routes.use('/users', userRouter);
routes.use('/carts', cartRouter);
routes.use('/products', productRouter);
routes.use('/search', searchRouter);

module.exports = { routes };