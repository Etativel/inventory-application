const db = require("../db/productQueries");

async function getAllProduct(req, res) {
  const products = await db.getAllProductQuery();
  res.render("dashboard", { content: { name: "product", data: products } });
}

module.exports = {
  getAllProduct,
};
