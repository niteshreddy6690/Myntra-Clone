const mongoose = require("mongoose");
// const validator = require("validator");
const jwtToken = require("jsonwebtoken");
const { roles } = require("../utils/Constants");

const UserSchema = new mongoose.Schema(
  {
    phonenumber: {
      type: Number,
      unique: true,
      require: [true, "Error: Enter Phone Number ir Required"],
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
    dob: {
      type: Date,
    },
    altPhone: { type: Number },
    hint: { type: String },
    role: {
      type: String,
      default: roles.user,
      enum: [roles.admin, roles.user],
    },
    isExistingUser: {
      type: Boolean,
      default: false,
    },
    verify: {
      type: String,
      required: true,
      default: "unverified",
    },
    location: {
      type: String,
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
