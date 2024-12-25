const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log("App listen to port", PORT);
});
