const getProfilePage = async (req, res, next) => {
  res.render("pages/profile", {
    isAuth: req.isAuthenticated(),
    user: req.user,
  });
};

module.exports = {
  getProfilePage,
};
