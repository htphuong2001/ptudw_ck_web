const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  products: [
    {
      type: String,
      ref: "Product",
    },
  ],
  status: {
    type: String,
    default: "processing",
  },
  total: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
