const homeRouter = require("./home");

module.exports = (app) => {
  app.use("/", homeRouter);
};
