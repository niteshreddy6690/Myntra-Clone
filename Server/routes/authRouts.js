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
// router.get("/user/:id", getuser);
router.put("/otpverify/:id", optverify);
router.get("/resendotp/:id", resendOtp);
router.put("/createAccount/:phone", createAccount);
router.post("/token", refreshToken);
// route.put("/user/:id", updateuserdetails);
router.post("/logout", logout);

module.exports = router;
