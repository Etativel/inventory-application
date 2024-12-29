const db = require("../db/Queries");

async function getAllProduct(req, res) {
  const products = await db.getAllProductQuery();
  const categories = await db.getAllCategoryQuery();
  res.render("dashboard", {
    content: {
      name: "product",
      data: products,
      category: categories,
      mode: "view",
    },
  });
}

async function getProductForm(req, res) {
  const categories = await db.getAllCategoryQuery();
  res.render("dashboard", {
    content: { mode: "insert-product", category: categories, item: null },
  });
}

async function getUpdateData(req, res) {
  const productId = req.params.id;
  const categories = await db.getAllCategoryQuery();
  const item = await db.getProduct(productId);
  res.render("dashboard", {
    content: { mode: "update-product", item: item[0], category: categories },
  });
}

async function updateProduct(req, res) {
  const { id, name, description, price, quantity, category_id } = req.body;
  console.log("param update", category_id);
  await db.updateProduct({
    id,
    name,
    description,
    price,
    quantity,
    category_id,
  });
  res.redirect("/dashboard/product");
}

async function insertProductHandler(req, res) {
  const { name, description, price, quantity, category_id } = req.body;
  console.log("category Id", category_id);
  await db.insertProduct({ name, description, price, quantity, category_id });
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
  getProductForm,
  getUpdateData,
  updateProduct,
};
