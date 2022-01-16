const Product = require("../models/product");

const getHomePage = async (req, res, next) => {
  try {
    const newRelease = await Product.find({})
      .sort({ release: "desc" })
      .limit(4);

    const bestSale = await Product.find({}).sort({ discount: "desc" }).limit(4);
    res.render("pages/home", {
      isAuth: req.isAuthenticated(),
      newRelease,
      bestSale,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
};

module.exports = {
  getHomePage,
  logout,
};
