const db = require("../db/productQueries");

async function getAllProduct(req, res) {
  const products = await db.getAllProductQuery();
  res.send(products);
}

module.exports = {
  getAllProduct,
};
