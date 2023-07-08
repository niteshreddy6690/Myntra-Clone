const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  otp: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    index: true,
    expires: "30m",
  },
});

module.exports = mongoose.model("Otp", OtpSchema);
