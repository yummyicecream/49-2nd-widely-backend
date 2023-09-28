const { AppDataSource } = require('./data-source');
const viewBySearch = async (keyword) => {
  let query = `
        SELECT
        products.id AS id,
        products.name AS name,
        products.price AS price,
        products.stock AS stock,
        products.description AS description,
        product_images.image AS image
        FROM 
        products
        INNER JOIN 
        product_images ON product_images.product_id = products.id 
        WHERE product_images.is_thumbnail = 1 AND products.name LIKE '%${keyword}%'`;

  const result = await AppDataSource.query(query);
  return result;
};
module.exports = { viewBySearch };
