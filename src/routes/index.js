const express = require('express');
const routes = express.Router();

const userRouter = require('./userRouter');
const cartRouter = require('./cartRoutes');

routes.use('/users', userRouter);
routes.use('/carts', cartRouter);

module.exports = { routes };
