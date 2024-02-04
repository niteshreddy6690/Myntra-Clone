const User = require("../models/User");
const Otp = require("../models/Otp");
const catchAsync = require("../utils/catchAsync");
const fast2sms = require("fast-two-sms");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../services/userServices");
// const { sendMessage } = require("fast-two-sms");
// const TwoFactor = new (require("2factor"))(
//   "process.env.TW"
// );

const Token = require("../models/Token");

// Register user
const register = catchAsync(async (req, res) => {
  const { phonenumber } = req.body;
  const phoneRegEx = "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";
  let otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  if (phonenumber.match(phoneRegEx)) {
    var user = await User.findOne({ phonenumber: phonenumber });

    if (!user) {
      user = await User.create({
        phonenumber,
      });

      // isNewUser = true;
    }

    //   Math.floor((1 + Math.random()) * 90000);

    // let options = {
    //   authorization: process.env.Fast2SMS_API,
    //   message: ` Your Myntra otp ${otp}`,
    //   numbers: ["9901145387"],
    // };
    const userOtp = await Otp.deleteMany({ userId: user.id });

    // if (userOtp) {
    //   await userOtp.deleteMany();
    // }
    if (user) {
      await Otp.create({
        userId: user.id,
        otp: otp,
      });
    }
  }

  // TwoFactor.sendOTP(phonenumber, {
  //   otp: otp,
  //   template: "CLONE Myntra OTP",
  // }).then(
  //   (sessionId) => {
  //
  //   },
  //   (error) => {
  //
  //   }
  // );

  //   fast2sms.sendMessage(options).then((response) => {
  //
  //     if (response.return === true) {
  //       async function fun() {
  //         user.otp = otp;
  //         await user.save();
  //       }
  //       fun();

  //       res.status(200).json({
  //         success: true,
  //         user,
  //         message: `OTP Sent on ${user.phonenumber} Successfully`,
  //       });
  //     } else {
  //
  //       res.status(400).json({
  //         success: false,
  //       });
  //     }
  //   });

  res.status(200).json({ message: "success", otp: otp, user });
});

// Verify otp
const verifyOtp = async (req, res) => {
  const { otp, phoneNumber } = req.body;
  const user = await User.findOne(
    { phonenumber: phoneNumber },
    { createdAt: 0, updatedAt: 0 }
  );
  const otpUser = await Otp.findOne({ userId: user?.id });
  if (!otpUser?.otp) {
    return res.status(401).json({
      message: "Your OTP has been expired",
    });
  }
  if (otp === otpUser?.otp) {
    user.verify = "verified";
    otpUser.otp = null;
    await user.save();
    await otpUser.save();
    const AccessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_ACCESS_SECRET_KEY,
      { expiresIn: "30d" }
    );
    const RefreshToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_REFRESH_SECRET_KEY,
      { expiresIn: "30d" }
    );
    // alternate code to remove the token from the Token Schema
    // const userToken = await Token.findOne({ userId: user.id });
    // if (userToken) {
    //   await userToken.remove();
    // }

    await Token.deleteMany({ userId: user.id });
    const token = await new Token({
      userId: user.id,
      token: RefreshToken,
    }).save();
    return res
      .status(200)
      .json({ AccessToken, RefreshToken: token?.token, user });
  } else {
    return res.status(403).json({
      message: "Invalid OTP",
    });
  }
};

//Resend Otp
const resendOtp = catchAsync(async (req, res) => {
  const { phonenumber } = req.body;

  const user = await userService.getUserByPhoneNumber(phonenumber);

  const otpUser = await Otp.deleteMany({ userId: user.id });

  let otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  if (user) {
    await Otp.create({
      userId: user.id,
      otp: otp,
    });
  }
  res.status(200).json({ message: "success Resend OTP", otp: otp });
});
// Create Account
const createAccount = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.phone, req.body);

  res.send(user);
});

// REFRESH TOKEN
const refreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });
  const token = await Token.findOne({ token: refreshToken });
  if (!token) return res.status(404).json({ message: "not found in DB" });
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET_KEY,
    async (err, payload) => {
      if (err)
        return res
          .status(500)
          .json({ message: "error verifying refresh token" });
      const AccessToken = jwt.sign(
        {
          id: payload.id,
          email: payload.email,
          role: payload.role,
        },
        process.env.JWT_ACCESS_SECRET_KEY,
        { expiresIn: "30m" }
      );
      res.status(200).json({ AccessToken });
    }
  );
});

// logout
const logout = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });
  const refreshTokenDoc = await Token.findOne({ token: refreshToken });
  if (!refreshTokenDoc)
    return res.status(200).json({ message: "User already logged out" });
  refreshTokenDoc.remove();
  return res.status(200).json({ message: "successfully logged out" });
});
module.exports = {
  register,
  verifyOtp,
  createAccount,
  resendOtp,
  refreshToken,
  logout,
};
