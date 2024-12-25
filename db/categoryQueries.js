const pool = require("./pool");

async function getAllCategoryQuery() {
  const { rows } = await pool.query("SELECT * FROM category_table");
  return rows;
}

module.exports = {
  getAllCategoryQuery,
};
