const express = require("express");

const {
  getStorePage,
  getStoreAjax,
  getProductDetail,
} = require("../controllers/store");

const router = express.Router();

router.get("/", getStorePage);

router.post("/ajax", getStoreAjax);

router.get("/:productId", getProductDetail);

module.exports = router;
