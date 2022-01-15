const express = require("express");

const {
  getProfilePage,
  updateProfile,
  changePassword,
} = require("../controllers/profile");

const router = express.Router();

router.get("/", getProfilePage);

router.post("/update", updateProfile);

router.post("/change-password", changePassword);

module.exports = router;
