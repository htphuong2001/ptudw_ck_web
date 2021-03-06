const Tag = require("../models/Tag");
const Product = require("../models/product");
const Category = require("../models/category");

const getStorePage = async (req, res, next) => {
  try {
    const tags = await Tag.find({});
    const categories = await Category.find({});
    const recordsTotal = await Product.find({}).sort({ release: "desc" });

    const products = recordsTotal.slice(0, 12);

    const opt = {
      page: 1,
      totalPage: Math.ceil(recordsTotal.length / 12),
    };

    res.render("pages/store", {
      isAuth: req.isAuthenticated(),
      products,
      categories,
      tags,
      opt,
    });
  } catch (error) {
    next(error);
  }
};

const getStoreAjax = async (req, res, next) => {
  try {
    let sumPage;
    const { _page, _tag, _sort } = req.body;
    console.log(_tag);
    const [sortCol, sortType] = _sort.split("|");
    const recordsTotal = await Product.find({}).sort({ [sortCol]: sortType });
    let products;
    if (_tag) {
      const listFilter = recordsTotal.filter((record) => {
        const tags = record.tags;
        return _tag.every((tag) => {
          return tags.includes(tag);
        });
      });
      products = listFilter.slice((_page - 1) * 12, _page * 12);
      sumPage = listFilter.length;
    } else {
      console.log("no");
      products = recordsTotal.slice((_page - 1) * 12, _page * 12);
      sumPage = recordsTotal.length;
    }

    const opt = {
      page: _page,
      totalPage: Math.ceil(sumPage / 12),
    };

    res.send({ products, opt });
  } catch (error) {
    next(error);
  }
};

const getProductDetail = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).populate("tags", "name");
    res.render("pages/product-detail", {
      isAuth: req.isAuthenticated(),
      product,
    });
  } catch (error) {
    next(error);
  }
};

const searchProduct = async (req, res, next) => {
  try {
    const { search } = req.query;
    const tags = await Tag.find({});
    const categories = await Category.find({});
    const recordsTotal = await Product.find({
      name: { $regex: search, $options: "i" },
    }).sort({ release: "desc" });

    const products = recordsTotal.slice(0, 12);

    const opt = {
      page: 1,
      totalPage: Math.ceil(recordsTotal.length / 12),
    };

    res.render("pages/store", {
      isAuth: req.isAuthenticated(),
      products,
      categories,
      tags,
      opt,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStorePage,
  getStoreAjax,
  getProductDetail,
  searchProduct,
};
