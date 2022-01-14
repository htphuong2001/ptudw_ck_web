const express = require("express");
const { isAuth } = require("../config/auth");

const router = express.Router();

router.get("/", isAuth, (req, res, next) => {
  res.render("pages/home");
});

module.exports = router;
