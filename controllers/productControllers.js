const db = require("../db/Queries");

async function getAllProduct(req, res) {
  const products = await db.getAllProductQuery();
  const categories = await db.getAllCategoryQuery();
  res.render("dashboard", {
    content: { name: "product", data: products, category: categories },
  });
}

async function insertProductHandler(req, res) {
  const { name, description, price, quantity, category } = req.body;
  await db.insertProduct({ name, description, price, quantity, category });
  console.log("inserted");
  res.redirect("/dashboard/product");
}

async function deleteProduct(req, res) {
  const productId = req.params.id;
  await db.deleteProduct(productId);
  res.redirect("/dashboard/product");
}

module.exports = {
  getAllProduct,
  insertProductHandler,
  deleteProduct,
};
