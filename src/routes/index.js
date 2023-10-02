const express = require('express');
const routes = express.Router();

const userRouter = require('./userRouter');
const orderRoute = require('./orderRoute');

routes.use('/users', userRouter);
routes.use('/orders', orderRoute);


module.exports = { routes };
