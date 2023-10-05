const { productDao, categoryQueryBuilder } = require('../models');
const { throwError } = require('../utils');

const viewProduct = async (id) => {
  return await productDao.oneProduct(id);
};

const viewByCategory = async (categoryId, sort, offset, page, size) => {
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
  const pageQuery = await categoryQueryBuilder.page(offset, size);
  // limit ? offset ?

  const resultA = await productDao.resultA(categoryQueryA, categoryId);

  const resultB = await productDao.resultB(categoryQueryB, '', orderQuery, pageQuery);

  resultA[0].list = resultB;

  return resultA[0];
};
const viewByNew = async (category, sort, page, size, offset) => {
  const orderQuery = await categoryQueryBuilder.order(sort);
  // order by products.price ???
  const pageQuery = await categoryQueryBuilder.page(offset, size);
  // limit ? offset ?
  const weekQuery = await categoryQueryBuilder.week(category);

  const resultB = await productDao.resultB('', weekQuery, orderQuery, pageQuery);

  const result = {};
  result.category = '신제품';
  result.total = resultB.length;
  result.list = resultB;
  return result;
};
const viewMain = async () => {
  const data = {};
  for (let i = 1; i < 5; i++) {
    const categoryQuery = await categoryQueryBuilder.categoryB(i);
    const result = await productDao.resultB(categoryQuery, '', '', '');
    data[`result${i}`] = result;
  }
  return data;
};

module.exports = { viewProduct, viewByCategory, viewMain, viewByNew };
