const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  brand: {
    type: "string",
    required: true,
  },
  description: { type: "string", required: true },
  images: { type: Array, required: true },
  categories: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  size: { type: Array },
  price: { type: "number", required: true },
  mrp: { type: "number" },
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

ProductSchema.pre("save", function (next) {
  if (this.price)
    // do stuff
    this.mrp = Math.trunc(
      this.price - this.price * (this.discountPercentage / 100)
    );
  console.log("this", this);
  next();
});
module.exports = mongoose.model("Product", ProductSchema);
