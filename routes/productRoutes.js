const express = require("express");
const router = express();
router.use(express.urlencoded({ extended: true }));

const controller = require("../controllers/productControllers");

router.get("/dashboard/product", controller.getAllProduct);
router.post("/dashboard/product", controller.insertProductHandler);
router.get("/delete/:id", controller.deleteProduct);
module.exports = router;
