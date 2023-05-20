const User = require("../models/User");
const Otp = require("../models/Otp");
const catchAsync = require("../utils/catchAsync");
const fast2sms = require("fast-two-sms");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userService = require("../services/userServices");
const axios = require("axios");
// const { sendMessage } = require("fast-two-sms");
const TwoFactor = new (require("2factor"))(
  "1ba23eeb-b77d-11ed-813b-0200cd936042"
);
const Token = require("../models/Token");

// fast2sms.sendMessage(options).then((response) => {
//   console.log(response);
// });

// exports.register = catchAsync(async (req, res) => {
//   const { phonenumber } = req.body;

//   console.log(phonenumber);
//   const userr = await User.findOne({ phonenumber: phonenumber });

//   if (!userr) {
//     const user = await User.create({
//       phonenumber,
//     });
//   }

//   const user = await User.findOne({ phonenumber: phonenumber });

//   //   let otp = Math.floor((1 + Math.random()) * 90000);

//   //   let options = {
//   //     authorization: process.env.Fast2SMS_API,
//   //     message: `This Website is made by Vikas Verma Thank You to use my Website Your OTP: is ${otp}`,
//   //     numbers: [phonenumber],
//   //   };

//   //   sendMessage(options)
//   //     .then((response) => {
//   //       if (response.return === true) {
//   //         async function fun() {
//   //           user.otp = otp;
//   //           await user.save();
//   //         }
//   //         fun();

//   //         res.status(200).json({
//   //           success: true,
//   //           user,
//   //           message: `OTP Sent on ${user.phonenumber} Successfully`,
//   //         });
//   //       } else {
//   //         console.log(response);
//   //         res.status(400).json({
//   //           success: false,
//   //         });
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.log(error);
//   //     });
// });

const register = catchAsync(async (req, res) => {
  const { phonenumber } = req.body;
  const phoneRegEx = "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";
  let otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  // let isNewUser = false;
  if (phonenumber.match(phoneRegEx)) {
    console.log("it is  a phone number");
    var user = await User.findOne({ phonenumber: phonenumber });
    console.log("User", user);
    if (!user) {
      console.log(
        "No user is existed with this phone number so will create a new User"
      );
      user = await User.create({
        phonenumber,
      });
      console.log("User after create ", user);
      // isNewUser = true;
    }

    //   Math.floor((1 + Math.random()) * 90000);
    console.log(otp);
    // let options = {
    //   authorization: process.env.Fast2SMS_API,
    //   message: ` Your Myntra otp ${otp}`,
    //   numbers: ["9901145387"],
    // };
    const userOtp = await Otp.findOne({ userId: user.id });

    console.log("user otp schema", userOtp);

    if (userOtp) {
      await Otp.deleteMany();
    }
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
  //     console.log(sessionId);
  //   },
  //   (error) => {
  //     console.log(error);
  //   }
  // );

  //   fast2sms.sendMessage(options).then((response) => {
  //     console.log(response);
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
  //       console.log(response);
  //       res.status(400).json({
  //         success: false,
  //       });
  //     }
  //   });

  res.status(200).json({ message: "success", otp: otp, user });
});

const optverify = async (req, res) => {
  console.log("req body", req.body);
  console.log("req.params", req.params);
  const { otp } = req.body;

  const user = await User.findOne({ phonenumber: req.params.id });
  console.log("user from user Schema", user);
  const otpUser = await Otp.findOne({ userId: user.id });
  //   console.log("OTp User", otpUser);
  //   console.log("otp value", otp);
  if (!otpUser?.otp) {
    return res.status(401).json({
      message: "Your OTP has been expired",
    });
  }
  if (otp === otpUser?.otp) {
    console.log("contains otp in otp");
    user.verify = "verified";
    otpUser.otp = null;
    await user.save();
    await otpUser.save();

    console.log("user is already existed so we need will generate auth token");
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

    const userToken = await Token.findOne({ userId: user.id });
    if (userToken) {
      await userToken.remove();
    }
    const token = await new Token({
      userId: user.id,
      token: RefreshToken,
    }).save();

    console.log("AccessToken", AccessToken);
    console.log("RefreshToken", RefreshToken);
    //   console.log("token", token);
    return res.status(200).json({ AccessToken, RefreshToken, user });

    return res.status(200).json({ message: "success", user: user });
  } else {
    return res.status(403).json({
      message: "Invalid OTP",
    });
  }
};

const resendOtp = catchAsync(async (req, res) => {
  const { phonenumber } = req.body;
  const user = await userService.getUserByPhoneNumber(phonenumber);
  const otpUser = await Otp.findOne({ userId: user.id });

  let otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  if (otpUser) {
    await Otp.remove();
  }
  if (user) {
    await Otp.create({
      userId: user.id,
      otp: otp,
    });
  }

  res.status(200).json({ message: "success Resend OTP", otp: otp });
});
const createAccount = catchAsync(async (req, res) => {
  console.log(req.body);
  const user = await userService.updateUser(req.params.phone, req.body);
  console.log("user", user);
  res.send(user);
});

// REFRESH TOKEN
const refreshToken = catchAsync(async (req, res) => {
  const refreshToken = req.body.refreshToken;
  // console.log(refreshToken);
  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  const token = await Token.findOne({ token: refreshToken });

  if (!token)
    return res.status(403).json({ message: "does not contain refresh token" });
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET_KEY,
    async (err, payload) => {
      if (err)
        return res
          .status(500)
          .json({ message: "error verifying refresh token" });

      // console.log("payload :" + JSON.stringify(payload));

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
    return res.status(403).json({ message: "does not contain refresh token" });
  refreshTokenDoc.remove();
  return res.status(200).json({ message: "successfully logged out" });
});
module.exports = {
  register,
  optverify,
  createAccount,
  resendOtp,
  refreshToken,
  logout,
};
