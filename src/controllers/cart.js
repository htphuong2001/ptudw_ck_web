const Product = require("../models/product");

const getCartPage = async (req, res, next) => {
  try {
    res.render("pages/cart", {
      isAuth: req.isAuthenticated(),
    });
  } catch (error) {
    next(error);
  }
};

const getCartAjax = async (req, res, next) => {
  try {
    const { listProduct } = req.body;
    const products = await Promise.all(
      listProduct.map((productId) => {
        return Product.findById(productId);
      })
    );

    res.send(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCartPage,
  getCartAjax,
};
