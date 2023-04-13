const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  addressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAddress.address",
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  itemsOrdered: {
    type: Array,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
