const express = require("express");
const passport = require("passport");
require("../config/passport")(passport);

const { getLoginPage, login } = require("../controllers/login");

const router = express.Router();

router.get("/", getLoginPage);

router.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/login" }),
  login
);

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  login
);

module.exports = router;
