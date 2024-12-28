const pool = require("./pool");

async function getAllCategoryQuery() {
  const { rows } = await pool.query("SELECT * FROM category_table ORDER BY id");
  return rows;
}

async function getAllProductQuery() {
  const { rows } = await pool.query(
    "SELECT * FROM inventory_table ORDER BY id"
  );
  return rows;
}

async function getProduct(id) {
  console.log("product id", id);
  const { rows } = await pool.query(
    `SELECT * FROM inventory_table WHERE id = ($1)`,
    [id]
  );
  console.log(rows);
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

async function insertCategory(params) {
  await pool.query(
    `
      INSERT INTO category_table (
      category
      )
      VALUES (
          $1
      );
      `,
    [params.category]
  );
}

// DELETE

async function deleteProduct(params) {
  await pool.query(
    `
            DELETE FROM inventory_table WHERE id = ($1)
        
        `,
    [params]
  );
}

// UPDATE

async function updateProduct(params) {
  console.log("update params", params);
  await pool.query(
    `
    UPDATE inventory_table
    SET name = ($1), description = ($2),
    price = ($3), quantity = ($4), category = ($5) 
    WHERE id = ($6);
    `,
    [
      params.name,
      params.description,
      params.price,
      params.quantity,
      params.category,
      params.id,
    ]
  );
}

module.exports = {
  getAllProductQuery,
  getAllCategoryQuery,
  insertProduct,
  insertCategory,
  deleteProduct,
  getProduct,
  updateProduct,
};
