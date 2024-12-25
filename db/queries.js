const pool = require("./pool");

async function getAllCategory() {
  const { rows } = await pool.query("SELECT * FROM category_table");
  return rows;
}

async function getAllProducts() {
  const { rows } = await pool.query("SELECT * FROM inventory_table");
  return rows;
}
