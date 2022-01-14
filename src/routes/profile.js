const express = require("express");

const { getProfilePage } = require("../controllers/profile");

const router = express.Router();

router.get("/", getProfilePage);

module.exports = router;
