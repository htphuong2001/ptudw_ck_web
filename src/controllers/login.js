const getLoginPage = async (req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.success_msg = req.flash("success_msg");
  res.render("pages/login", { isAuth: req.isAuthenticated() });
};

const login = async (req, res, next) => {
  res.redirect("/");
};

module.exports = {
  getLoginPage,
  login,
};
