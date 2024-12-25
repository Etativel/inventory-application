const pool = require("./pool");

async function getAllProductQuery() {
  const { rows } = await pool.query("SELECT * FROM inventory_table");
  return rows;
}

module.exports = {
  getAllProductQuery,
};
