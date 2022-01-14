const User = require("../models/user");
const { userValidate } = require("../config/validation");

const getRegisterPage = async (req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.success_msg = req.flash("success_msg");
  res.render("pages/register");
};

const register = async (req, res, next) => {
  try {
    const { username, password, passwordC } = req.body;

    const { error } = userValidate({ username, password });
    if (error) {
      const errMessage = error.details[0].message;
      req.flash("error_msg", errMessage);
      res.redirect("/register");
    }

    const user = await User.findOne({ username });
    if (user) {
      req.flash("error_msg", "Username existed");
      res.redirect("/register");
    }

    if (password != passwordC) {
      req.flash("error_msg", "Confirmed password is not correct");
      res.redirect("/register");
    }

    await User.create({
      username,
      password,
    });
    req.flash("success_msg", "Register success. Let's login");
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getRegisterPage,
  register,
};
