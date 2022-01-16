const express = require("express");

const { getCartPage, getCartAjax } = require("../controllers/cart");

const router = express.Router();

router.get("/", getCartPage);

router.post("/ajax", getCartAjax);

module.exports = router;
