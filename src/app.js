const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// EJS engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", (req, res, next) => {
  res.render("pages/home");
});

app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
