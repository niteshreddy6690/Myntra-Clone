const router = require("express").Router();
// const {isAuthenticateuser} = require('../Middelwares/authuser.js')
const {
  register,
  optverify,
  resendOtp,
  createAccount,
  refreshToken,
  logout,
  // updateuserdetails,
} = require("../controllers/authController");

router.post("/registermobile", register);
router.put("/otpverify", optverify);
// router.post("/resendotp", resendOtp);
router.put("/createAccount/:phone", createAccount);
router.post("/token", refreshToken);
router.post("/logout", logout);

module.exports = router;
