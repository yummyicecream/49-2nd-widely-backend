const { AppDataSource } = require('./data-source');

const oneProduct = async (id) => {
  const product = await AppDataSource.query(
    `
      SELECT
      products.id AS id,
      products.name AS name,
      products.price AS price,
      products.stock AS stock,
      products.description AS description,
      JSON_ARRAYAGG(product_images.image) AS image
      FROM
      products
      INNER JOIN 
      product_images ON product_images.product_id = products.id 
      WHERE 
      products.id = '${id}'
      GROUP BY 
      products.id
      `,
  );
  return product;
};

const resultA = async (categoryQueryA, categoryId) => {
  let query = `
          SELECT
          categories.name AS category,
          (SELECT count(*) FROM products ${categoryQueryA}) AS total
          FROM 
          categories
          WHERE 
          categories.id = ${categoryId}
          `;
  return await AppDataSource.query(query);
};

const resultB = async (categoryQueryB, orderQuery, pageQuery) => {
  let query = `
          SELECT
          products.id AS id,
          products.name AS name,
          cast(products.price AS signed) AS price,
          products.stock AS stock,
          products.description AS description,
          categories.name AS category,
          product_images.image AS image
          FROM 
          products
          INNER JOIN 
          categories ON categories.id = products.category_id
          INNER JOIN
          product_images ON product_images.product_id = products.id 
          WHERE 
          product_images.is_thumbnail = 1 ${categoryQueryB}
           ${orderQuery} 
           ${pageQuery}
          `;

  return await AppDataSource.query(query);
};

module.exports = { oneProduct, resultA, resultB };
