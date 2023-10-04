const { productService } = require('../services');

const viewProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productService.viewProduct(id);
  res.status(200).json({ data: product[0] });
};

const viewByCategory = async (req, res) => {
  const { category, sort = 'lowprice', page = 1, size = 6 } = req.query;
  const offset = size * (page - 1);
  if (category == 'all') {
    categoryId = 0;
  }
  if (category == 'nutrient') {
    categoryId = 1;
  }
  if (category == 'shaving') {
    categoryId = 2;
  }
  if (category == 'skin') {
    categoryId = 3;
  }
  if (category == 'food') {
    categoryId = 4;
  }
  if (category == 'new') {
    const result = await productService.viewByNew(category, sort, page, size, offset);
    return res.status(200).json({ data: result });
  }

  //http://localhost:8000/products?category=all&sort=latest&page=1

  const result = await productService.viewByCategory(categoryId, sort, offset, page, size);
  return res.status(200).json({ data: result });
};

const viewMain = async (_, res) => {
  const result = await productService.viewMain();
  res.status(200).json({ data: result });
};
module.exports = { viewProduct, viewByCategory, viewMain };
