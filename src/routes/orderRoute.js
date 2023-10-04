const express = require('express');
const { validateToken } =require('../middlewares')
const { asyncWrap } = require('../utils');
const { orderController } = require('../controllers');

const router = express.Router();

router.get('/', validateToken, asyncWrap(orderController.getOrder));
router.post('/', validateToken, asyncWrap(orderController.postOrder));
router.get('/result', validateToken, asyncWrap(orderController.getOrderResult));

module.exports = router;