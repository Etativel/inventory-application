const db = require("../db/Queries");

async function getAllCategory(req, res) {
  const categories = await db.getAllCategoryQuery();
  console.log(categories);
  res.render("dashboard", { content: { name: "category", data: categories } });
}

async function insertCategoryHandler(req, res) {
  const insertValue = {
    category: req.body.category,
  };

  console.log(insertValue);

  await db.insertCategory(insertValue);
  console.log("inserted");
  res.redirect("/dashboard/category");
}

module.exports = {
  getAllCategory,
  insertCategoryHandler,
};
