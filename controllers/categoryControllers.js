const db = require("../db/categoryQueries");

async function getAllCategory(req, res) {
  const products = await db.getAllCategoryQuery();
  res.send(products);
}

module.exports = {
  getAllCategory,
};
