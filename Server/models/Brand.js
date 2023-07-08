const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: { type: "string", required: true, unique: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
