const express = require("express");
const router = express();
router.use(express.urlencoded({ extended: true }));

const controller = require("../controllers/productControllers");

router.get("/dashboard/product", controller.getAllProduct);
router.get("/dashboard/product/add-product", controller.getProductForm);
router.post("/dashboard/product/add-product", controller.insertProductHandler);
router.post("/delete/:id", controller.deleteProduct);
module.exports = router;
