const { AppDataSource } = require('./data-source');
const viewBySearch = async (keyword) => {
  let query = `
          SELECT
          p.id AS id,
          p.name AS name,
          p.price AS price,
          p.stock AS stock,
          p.description AS description,
          pi.image AS thumbnail_image
          FROM 
          products p
          INNER JOIN 
          product_images pi ON pi.product_id = p.id 
          WHERE pi.is_thumbnail = 1 AND p.name LIKE '%${keyword}%'
          `;

  const result = await AppDataSource.query(query);
  return result;
};
module.exports = { viewBySearch };
