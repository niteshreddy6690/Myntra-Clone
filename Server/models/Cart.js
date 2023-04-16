const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    size: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CartSchema = new Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [ItemSchema],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("cart", CartSchema);

// const CartSchema = new mongoose.Schema(
//   {
//     products: [
//       {
//         productId: { type: "string" },
//         brand: { type: "string" },
//         description: { type: "string" },
//         categories: { type: Array },
//         quantity: { type: "number", default: 1 },
//         gender: { type: "string" },
//         price: { type: "number", required: true },
//         images: { type: Array },
//         size: { type: "string" },
//         discountPercentage: { type: "number", default: 0 },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Cart", CartSchema);
