const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 10,
    max: 60,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
  },
  locality: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 100,
  },
  streetAddress: {
    type: String,
    required: true,
    trim: true,
    min: 2,
    max: 100,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    min: 2,
    max: 100,
  },
  addressType: {
    type: String,
    required: true,
    enum: ["home", "work"],
    required: true,
  },
  isDefault: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const userAddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: [addressSchema],
  },
  { timestamps: true }
);

//   mongoose.model("Address", addressSchema);
module.exports = mongoose.model("Address", userAddressSchema);
