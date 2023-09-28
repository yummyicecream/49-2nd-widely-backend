const { productService } = require('../services');

const viewProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productService.viewProduct(id);
  res.status(200).json({ data: product[0] });
};

const viewByCategory = async (req, res) => {
  const { categoryId = undefined } = req.params;
  const { sort = 'lowprice', page = 1 } = req.query;
  const offset = 6 * (page - 1);
  const result = await productService.viewByCategory(categoryId, sort, offset, page);
  res.status(200).json({ data: result });
};
const viewMain = async (_, res) => {
  const result = await productService.viewMain();
  res.status(200).json({ data: result });
};
module.exports = { viewProduct, viewByCategory, viewMain };
