const order = async (sort) => {
  switch (sort) {
    case 'lowprice':
      return `ORDER BY products.price ASC`;
    case 'highprice':
      return `ORDER BY products.price DESC`;
    case 'latest':
      return `ORDER BY products.created_at DESC`;
    default:
      return `ORDER BY products.id_at ASC`;
  }
};

const page = async (offset) => {
  if (!offset) return '';
  return `LIMIT 6 OFFSET ${offset}`;
};

const categoryA = async (categoryId) => {
  if (categoryId == 0) return '';
  return `WHERE products.category_id = ${categoryId}`;
};

const categoryB = async (categoryId) => {
  if (categoryId == 0) return '';
  return `AND categories.id = ${categoryId}`;
};

module.exports = { order, page, categoryA, categoryB };
