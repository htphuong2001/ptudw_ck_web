const express = require("express");

const { getRegisterPage, register } = require("../controllers/register");

const router = express.Router();

router.get("/", getRegisterPage);

router.post("/", register);

module.exports = router;
