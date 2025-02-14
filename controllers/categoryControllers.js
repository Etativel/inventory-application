const db = require("../db/Queries");

async function getAllCategory(req, res) {
  const categories = await db.getAllCategoryQuery();
  res.render("dashboard", {
    content: {
      name: "category",
      data: categories,
      mode: "view",
      query: {
        category: null,
        filter: null,
      },
    },
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
    res.render("categoryDeleteError");
    // res.send(
    //   "Cannot delete category because it is associated with existing inventory items."
    // );
  } else {
    await db.deleteCategory(category_id);
    res.redirect("/dashboard/category");
  }
}

// SEARCH
async function getCategorySearch(req, res) {
  const { category, filter } = req.body;
  const query = {
    category: category,
    filter: filter,
  };
  console.log(query);
  const categories = await db.findCategory(query);

  res.render("dashboard", {
    content: {
      name: "category",
      mode: "view",
      data: categories,
      query: { ...query },
    },
  });
}

module.exports = {
  getAllCategory,
  insertCategoryHandler,
  getCategoryForm,
  deleteCategory,
  getUpdateData,
  updateCategory,
  getCategorySearch,
};
