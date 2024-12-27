const db = require("../db/Queries");

async function getAllProduct(req, res) {
  const products = await db.getAllProductQuery();
  const categories = await db.getAllCategoryQuery();
  res.render("dashboard", {
    content: { name: "product", data: products, category: categories },
  });
}

async function insertProductHandler(req, res) {
  const insertValue = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
  };

  console.log(insertValue);

  await db.insertProduct(insertValue);
  console.log("inserted");
  res.redirect("/dashboard/product");
}

module.exports = {
  getAllProduct,
  insertProductHandler,
};
