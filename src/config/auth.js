const isAuth = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("message", "You don't authenticate");
    res.redirect("/login");
  }
  next();
};

const isAuthAjax = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.send({
      status: false,
      notLogin: true,
      message: "You need to login",
    });
  }
  next();
};

module.exports = {
  isAuth,
  isAuthAjax,
};
