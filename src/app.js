const express = require("express");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use("/", (req, res, next) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
