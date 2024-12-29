const db = require("../db/Queries");

async function getAllCategory(req, res) {
  const categories = await db.getAllCategoryQuery();
  res.render("dashboard", {
    content: { name: "category", data: categories, mode: "view" },
  });
}
async function getCategoryForm(req, res) {
  res.render("dashboard", { content: { mode: "insert-category" } });
}
async function insertCategoryHandler(req, res) {
  const insertValue = {
    category: req.body.category,
  };

  await db.insertCategory(insertValue);
  res.redirect("/dashboard/category");
}

module.exports = {
  getAllCategory,
  insertCategoryHandler,
  getCategoryForm,
};
