const express = require("express");
const router = express();
router.use(express.urlencoded({ extended: true }));

const controller = require("../controllers/categoryControllers");

router.get("/dashboard/category", controller.getAllCategory);
router.get("/dashboard/category/add-category", controller.getCategoryForm);
router.post(
  "/dashboard/category/add-category",
  controller.insertCategoryHandler
);
router.post("/delete-category/:id", controller.deleteCategory);

module.exports = router;
