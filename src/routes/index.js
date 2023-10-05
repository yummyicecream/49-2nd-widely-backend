const express = require('express');
const userRouter = require('./userRouter');
const { productRouter } = require('./productRoute');
const { searchRouter } = require('./searchRoute');

const routes = express.Router();
routes.use('/users', userRouter);
routes.use('/products', productRouter);
routes.use('/search', searchRouter);

module.exports = { routes };