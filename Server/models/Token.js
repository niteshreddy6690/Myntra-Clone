const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, expires: "30d", default: Date.now },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    //   expires: "60s", // 30 days
    // },
  }
  // {
  //   timestamps: true,
  // }
);

// tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 });
const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
