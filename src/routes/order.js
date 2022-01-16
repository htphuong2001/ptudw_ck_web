const express = require("express");

const { isAuthAjax } = require("../config/auth");

const { checkout } = require("../controllers/order");

const router = express.Router();

router.post("/check-out", isAuthAjax, checkout);

module.exports = router;
