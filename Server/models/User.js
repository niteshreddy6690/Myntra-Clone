const mongoose = require("mongoose");
// const validator = require("validator");
const jwtToken = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    phonenumber: {
      type: Number,
      unique: true,
      require: [true, "Error: Enter Phone Number ir Required"],
    },
    verify: {
      type: String,
      required: true,
      default: "unverified",
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    DOB: {
      type: Date,
    },
    isExistingUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// usermodel.methods.getJWTToken = function () {
//   return jwtToken.sign({ id: this._id }, process.env.SECRETID, {
//     expiresIn: "2d",
//   });
// };

module.exports = mongoose.model("User", UserSchema);
