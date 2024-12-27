const db = require("../db/Queries");

async function getAllCategory(req, res) {
  const categories = await db.getAllCategoryQuery();
  console.log(categories);
  res.render("dashboard", { content: { name: "category", data: categories } });
}

module.exports = {
  getAllCategory,
};
