const express = require("express");
const router = express();
router.use(express.urlencoded({ extended: true }));

const controller = require("../controllers/categoryControllers");

router.get("/dashboard/category", controller.getAllCategory);
router.post("/dashboard/category", controller.insertCategoryHandler);

module.exports = router;
