const Cart = require("../models/Cart");
const ApiError = require("../utils/ApiError");

exports.cart = async () => {
  try {
    const carts = await Cart.find().populate({
      path: "items.productId",
      select: { __v: 0, createdAt: 0, updatedAt: 0 },
    });
    // .sort({ "items.createdAt": -1 });
    //   console.log("Cart", carts[0]);
    return carts[0];
  } catch (err) {}
};

exports.addItem = async (payload) => {
  try {
    const newItem = await Cart.create(payload);
    return newItem;
  } catch (err) {
    throw new ApiError("500", "Something Went Wrong");
  }
};