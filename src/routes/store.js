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

router.get("/:productId", getProductDetail);

router.get("/search", searchProduct);

module.exports = router;
