const express = require("express");

const { getStorePage, getStoreAjax } = require("../controllers/store");

const router = express.Router();

router.get("/", getStorePage);

router.post("/ajax", getStoreAjax);

module.exports = router;
