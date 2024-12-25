require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const assetPath = path.join(__dirname, "public");
const categoryRouter = require("./routes/categoryRoutes");
const productRouter = require("./routes/productRoutes");

app.use(express.static(assetPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Home");
});
app.use("/dashboard/category", categoryRouter);
app.use("/dashboard/product", productRouter);

app.use((req, res) => {
  res.send("Not found");
});

const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log("App listen to port", PORT);
});
