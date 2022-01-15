const getStorePage = async (req, res, next) => {
  res.render("pages/store", { isAuth: req.isAuthenticated() });
};

module.exports = { getStorePage };
