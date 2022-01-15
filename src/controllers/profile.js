const User = require("../models/user");

const getProfilePage = async (req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.success_msg = req.flash("success_msg");
  res.render("pages/profile", {
    isAuth: req.isAuthenticated(),
    user: req.user,
  });
};

const updateProfile = async (req, res, next) => {
  try {
    const { username } = req.user;
    const { fullname, address } = req.body;

    await User.findOneAndUpdate({ username }, { fullname, address });
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { username } = req.user;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ username });
    console.log(user);
    const isValid = await user.isCheckPassword(oldPassword);
    if (!isValid) {
      req.flash("error_msg", "Change password faild");
      res.redirect("/profile");
    }
    await User.findOneAndUpdate({ username }, { password: newPassword });
    req.flash("success_msg", "Change password success");
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProfilePage,
  updateProfile,
  changePassword,
};
