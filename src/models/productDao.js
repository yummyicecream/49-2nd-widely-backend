const { AppDataSource } = require('./data-source');

const oneProduct = async (id) => {
  const product = await AppDataSource.query(
    `
    SELECT
    p.id AS id,
    p.name AS name,
    p.price AS price,
    p.stock AS stock,
    p.description AS description,
    t.image AS thumbnailImage,
    d.image AS detailImage
    FROM
    products p
    LEFT JOIN 
    product_images t ON t.product_id = p.id and t.is_thumbnail = 1
    LEFT JOIN
    product_images d ON d.product_id = p.id and d.is_thumbnail = 0
    WHERE 
    p.id = ?
    `,
    [id],
  );

  return product;
};

const resultA = async (categoryQueryA, categoryId) => {
  let query = `
          SELECT
          c.name AS category,
          (SELECT COUNT(*) FROM products ${categoryQueryA}) AS total
          FROM 
          categories c
          WHERE 
          c.id = ${categoryId}
          `;
  return await AppDataSource.query(query);
};

const resultB = async (categoryQueryB, weekQuery, orderQuery, pageQuery) => {
  let query = `
          SELECT
          p.id AS id,
          p.name AS name,
          CAST(p.price AS signed) AS price,
          p.stock AS stock,
          p.description AS description,
          c.name AS category,
          pi.image AS thumbnailImage
          FROM 
          products p
          INNER JOIN 
          categories c ON c.id = p.category_id
          INNER JOIN
          product_images pi ON pi.product_id = p.id 
          WHERE 
          pi.is_thumbnail = 1
          ${categoryQueryB}
          ${weekQuery}
          ${orderQuery}
          ${pageQuery}
          `;
  return await AppDataSource.query(query);
};

module.exports = { oneProduct, resultA, resultB };
