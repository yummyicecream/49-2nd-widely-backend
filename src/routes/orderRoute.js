const express = require('express');
const { validateToken } =require('../middlewares')
const { asyncWrap } = require('../utils');
const { orderController } = require('../controllers');

const router = express.Router();

router.get('/', validateToken, asyncWrap(orderController.getOrder));
router.post('/', validateToken, asyncWrap(orderController.postOrder));
router.post('/address', validateToken, asyncWrap(orderController.postAddress));
router.delete('/address/:addressId', validateToken, asyncWrap(orderController.deleteAddress));

module.exports = router;