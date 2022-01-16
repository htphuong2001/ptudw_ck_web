const express = require("express");

const {
  getStorePage,
  getStoreAjax,
  getProductDetail,
  searchProduct,
} = require("../controllers/store");

const router = express.Router();

router.get("/", getStorePage);

router.post("/ajax", getStoreAjax);

router.get("/search", searchProduct);

router.get("/:productId", getProductDetail);

module.exports = router;
