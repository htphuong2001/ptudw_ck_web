const isAuth = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("message", "You don't authenticate");
    res.redirect("/login");
  }
  res.locals.user = req.user;
  next();
};

module.exports = {
  isAuth,
};
