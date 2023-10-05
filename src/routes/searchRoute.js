const express = require('express');

const { searchController } = require('../controllers');
const searchRouter = express.Router();

searchRouter.get('/', searchController.viewBySearch);

module.exports = { searchRouter };
