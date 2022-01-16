const Order = require("../models/order");

const checkout = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.email === null) {
      res.send({
        status: false,
        message: "You need update email",
      });
    }
    const { products, totalBill } = req.body;
    console.log(products, totalBill);
    const newOrder = new Order({ user: user._id, products, total: totalBill });
    const savedOrder = await newOrder.save();
    res.send({
      status: true,
      message: "Checkout success",
      order: savedOrder,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkout };
