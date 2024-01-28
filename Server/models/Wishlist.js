const mongoose = require("mongoose");

const wishlist = new mongoose.Schema({
  // user: {
  //   type: mongoose.ObjectId,
  //   ref: "MynUser",
  //   required: true,
  // },
  wishlistProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("wishlist", wishlist);
