const router = require("express").Router();
// const {isAuthenticateuser} = require('../Middelwares/authuser.js')
const {
  register,
  getuser,
  optverify,
  resendOtp,
  createAccount,
  // logout,
  // updateuserdetails,
} = require("../controllers/userController");

router.post("/registermobile", register);
router.get("/user/:id", getuser);
router.put("/otpverify/:id", optverify);
router.get("/resendotp/:id", resendOtp);
router.put("/createAccount/:id", createAccount);
// route.put("/user/:id", updateuserdetails);
// route.get("/logout", logout);

module.exports = router;
