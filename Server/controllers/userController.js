const User = require("../models/User");
const Otp = require("../models/Otp");
const catchAsync = require("../utils/catchAsync");
const fast2sms = require("fast-two-sms");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const userService = require("../services/userServices");
const { response } = require("express");
// const { sendMessage } = require("fast-two-sms");

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
  const PhoneregEx = "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";
  let otp = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  if (phonenumber.match(PhoneregEx)) {
    console.log("it is  a phone number");
    let user = await User.findOne({ phonenumber: phonenumber });

    if (!user) {
      user = await User.create({
        phonenumber,
      });
    }

    //   Math.floor((1 + Math.random()) * 90000);
    console.log(otp);
    // let options = {
    //   authorization: process.env.Fast2SMS_API,
    //   message: ` Your Myntra otp ${otp}`,
    //   numbers: ["9901145387"],
    // };
    const userOtp = await Otp.findOne({ userId: user.id });

    console.log("uerer otp schema", userOtp);

    if (userOtp) {
      await Otp.remove();
    }

    if (user) {
      await Otp.create({
        userId: user.id,
        otp: otp,
      });
    }
  }

  res.status(200).json({ message: "success", otp: otp });

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
});

const getuser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ phonenumber: req.params.id });
  res.status(200).json({
    success: true,
    user,
  });
});

const optverify = async (req, res) => {
  console.log("req body", req.body);

  const { otp } = req.body;
  const user = await User.findOne({ phonenumber: req.params.id });
  console.log("user from user Schema", user);
  const otpUser = await Otp.findOne({ userId: user.id });
  console.log("OTp User", otpUser);
  console.log("otp value", otp);
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
    if (user.isExistingUser) {
      console.log(
        "user is already existed so we need will generate auth token"
      );
      const AccessToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        "Nitesh",
        { expiresIn: "30m" }
      );
      const RefreshToken = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        "Nitesh",
        { expiresIn: "30d" }
      );
      return res.status(200).json({ token: AccessToken, user });
    }
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
  const user = await userService.updateUserById(req.params.id, req.body);
  console.log("user", user);
  res.send(user);
});

module.exports = {
  register,
  getuser,
  optverify,
  createAccount,
  resendOtp,
};
