const pool = require("./pool");

async function getAllCategoryQuery() {
  const { rows } = await pool.query("SELECT * FROM category_table ORDER BY id");
  return rows;
}

async function getAllProductQuery() {
  const { rows } = await pool.query(
    "select inventory_table.id, name, description, price, quantity, category_table.category from inventory_table left join category_table on inventory_table.category_id = category_table.id ORDER BY inventory_table.id"
  );
  return rows;
}

async function getProduct(id) {
  const { rows } = await pool.query(
    `SELECT * FROM inventory_table WHERE id = ($1)`,
    [id]
  );
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
    category_id
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
      params.category_id,
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
  await pool.query(
    `
    UPDATE inventory_table
    SET name = ($1), description = ($2),
    price = ($3), quantity = ($4), category_id = ($5) 
    WHERE id = ($6);
    `,
    [
      params.name,
      params.description,
      params.price,
      params.quantity,
      params.category_id,
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
