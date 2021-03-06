const { isAuth } = require("../config/auth");

const registerRouter = require("./register");
const loginRouter = require("./login");
const profileRouter = require("./profile");
const storeRouter = require("./store");
const cartRouter = require("./cart");
const orderRouter = require("./order");

const { getHomePage, logout } = require("../controllers/index");

module.exports = (app) => {
  app.get("/", getHomePage);
  app.get("/logout", logout);

  app.use("/register", registerRouter);
  app.use("/login", loginRouter);
  app.use("/profile", isAuth, profileRouter);
  app.use("/store", storeRouter);
  app.use("/cart", cartRouter);
  app.use("/order", orderRouter);
};
