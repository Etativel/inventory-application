const express = require("express");
const router = express();
router.use(express.urlencoded({ extended: true }));

const controller = require("../controllers/categoryControllers");

router.get("/", controller.getAllCategory);
router.post("/", controller.insertCategoryHandler);

module.exports = router;
