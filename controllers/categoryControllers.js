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

async function getUpdateData(req, res) {
  const categoryId = req.params.id;
  const item = await db.getCategory(categoryId);
  res.render("dashboard", {
    content: { mode: "update-category", item: item[0] },
  });
}

async function updateCategory(req, res) {
  const { id, category } = req.body;
  await db.updateCategory({ id, category });
  res.redirect("/dashboard/category");
}

// DELETE

async function deleteCategory(req, res) {
  const category_id = req.params.id;
  const checkCategory = await db.checkCategoryInInventory(category_id);
  if (checkCategory.length >= 1) {
    res.send("Cannot delete used category");
  } else {
    await db.deleteCategory(category_id);
    res.redirect("/dashboard/category");
  }
}

module.exports = {
  getAllCategory,
  insertCategoryHandler,
  getCategoryForm,
  deleteCategory,
  getUpdateData,
  updateCategory,
};
