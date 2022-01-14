const homeRouter = require("./home");
const registerRouter = require("./register");

module.exports = (app) => {
  app.use("/register", registerRouter);
  app.use("/", homeRouter);
};
