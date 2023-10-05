const { searchDao } = require('../models');

const viewBySearch = async (keyword) => {
  return await searchDao.viewBySearch(keyword);
};

module.exports = { viewBySearch };
