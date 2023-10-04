const order = async (sort) => {
  switch (sort) {
    case 'lowprice':
      return `ORDER BY p.price ASC`;
    case 'highprice':
      return `ORDER BY p.price DESC`;
    case 'latest':
      return `ORDER BY p.created_at DESC`;
    default:
      return `ORDER BY p.id_at ASC`;
  }
};

const page = async (offset, size) => {
  if (offset == null || offset == undefined) return '';
  return `LIMIT ${size} OFFSET ${offset}`;
};

const week = async (category) => {
  if (category !== 'new') return '';
  return 'AND WEEK(p.updated_at) = WEEK(CURDATE())';
};

const categoryA = async (categoryId) => {
  if (categoryId == 0) return '';
  return `WHERE products.category_id = ${categoryId}`;
};

const categoryB = async (categoryId) => {
  if (categoryId == 0) return '';
  return `AND c.id = ${categoryId}`;
};

module.exports = { order, page, week, categoryA, categoryB };
