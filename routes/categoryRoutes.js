const express = require("express");
const router = express();

const controller = require("../controllers/categoryControllers");

router.get("/", controller.getAllCategory);

module.exports = router;
