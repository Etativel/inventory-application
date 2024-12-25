const express = require("express");
const router = express();

const controller = require("../controllers/productControllers");

router.get("/", controller.getAllProduct);

module.exports = router;
