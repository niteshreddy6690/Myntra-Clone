const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  brand: {
    type: "string",
    required: true,
  },
  description: { type: "string", required: true },
  images: { type: Array, required: true },
  categories: { type: Array },
  size: { type: Array },
  price: { type: "number", required: true },
  mrp: { type: "number", required: true },
  discountPercentage: { type: "number" },
  gender: { type: "string", required: true },
  color: { type: "string" },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  productRating: { type: String, default: 0 },
  noOfRatings: { type: String, default: 0 },
  inStock: { type: Boolean, default: true },
});

module.exports = mongoose.model("Product", ProductSchema);
