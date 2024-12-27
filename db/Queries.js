const pool = require("./pool");

async function getAllCategoryQuery() {
  const { rows } = await pool.query("SELECT * FROM category_table");
  return rows;
}

async function getAllProductQuery() {
  const { rows } = await pool.query("SELECT * FROM inventory_table");
  return rows;
}

// INSERT

async function insertProduct(params) {
  await pool.query(
    `
    INSERT INTO inventory_table (
    name,
    description,
    price,
    quantity,
    category
    )
    VALUES (
        $1, $2, $3, $4, $5
    );
    `,
    [
      params.name,
      params.description,
      params.price,
      params.quantity,
      params.category,
    ]
  );
}

module.exports = {
  getAllProductQuery,
  getAllCategoryQuery,
  insertProduct,
};
