const express = require("express");
const router = express();
router.use(express.urlencoded({ extended: true }));

const controller = require("../controllers/productControllers");

router.get("/", controller.getAllProduct);
router.post("/", controller.insertProductHandler);
module.exports = router;
