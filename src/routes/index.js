const homeRouter = require("./home");
const registerRouter = require("./register");
const loginRouter = require("./login");

module.exports = (app) => {
  app.use("/register", registerRouter);
  app.use("/login", loginRouter);
  app.use("/", homeRouter);
};
