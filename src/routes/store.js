const express = require("express");

const { getStorePage } = require("../controllers/store");

const router = express.Router();

router.get("/", getStorePage);

module.exports = router;
