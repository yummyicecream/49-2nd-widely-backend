const { productDao, categoryQueryBuilder } = require('../models');
const { throwError } = require('../utils');

const viewProduct = async (id) => {
  return await productDao.oneProduct(id);
};

const viewByCategory = async (categoryId, sort, offset, page) => {
  if (page < 1) {
    throwError(400, 'Non available page');
  }
  if (categoryId > 4) {
    throwError(400, 'Non available category');
  }

  const categoryQueryA = await categoryQueryBuilder.categoryA(categoryId);
  // where products.category_id = ?
  const categoryQueryB = await categoryQueryBuilder.categoryB(categoryId);
  // and categories.id = ?
  const orderQuery = await categoryQueryBuilder.order(sort);
  // order by products.price ???
  const pageQuery = await categoryQueryBuilder.page(offset);
  // limit 6 offset ?

  const resultA = await productDao.resultA(categoryQueryA, categoryId);

  const resultB = await productDao.resultB(categoryQueryB, orderQuery, pageQuery);

  resultA[0].list = resultB;

  return resultA[0];
};

const viewMain = async () => {
  const categoryOne = 1;
  const categoryQueryOne = await categoryQueryBuilder.categoryB(categoryOne);
  const resultOne = await productDao.resultB(categoryQueryOne, '', '');

  const categoryTwo = 2;
  const categoryQueryTwo = await categoryQueryBuilder.categoryB(categoryTwo);
  const resultTwo = await productDao.resultB(categoryQueryTwo, '', '');

  const categoryThree = 3;
  const categoryQueryThree = await categoryQueryBuilder.categoryB(categoryThree);
  const resultThree = await productDao.resultB(categoryQueryThree, '', '');

  const categoryFour = 4;
  const categoryQueryFour = await categoryQueryBuilder.categoryB(categoryFour);
  const resultFour = await productDao.resultB(categoryQueryFour, '', '');

  return {
    resultOne,
    resultTwo,
    resultThree,
    resultFour,
  };
};

module.exports = { viewProduct, viewByCategory, viewMain };
