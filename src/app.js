const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const createError = require("http-errors");
const logger = require("morgan");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// Logger
app.use(logger("dev"));

// EJS engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
  res.render("pages/home");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(new createError.NotFound("Page Not Found"));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("pages/error", { layout: false });
});

app.listen(port, () => {
  console.log(`App running at port ${port}`);
});
