const getHomePage = (req, res, next) => {
  res.render("pages/home", { isAuth: req.isAuthenticated() });
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
