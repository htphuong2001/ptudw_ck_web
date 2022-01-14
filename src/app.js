const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const createError = require("http-errors");
const logger = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

// Connect db
require("./config/connect_mongodb").connect();

// Logger
app.use(logger("dev"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "htp-epic",
    cookie: { maxAge: 1000 * 60 * 60 },
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Static file
app.use("/assets", express.static(path.join(__dirname, "public")));

// EJS engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Route
require("./routes/index")(app);

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
