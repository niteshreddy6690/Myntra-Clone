const router = require("express").Router();
const { authorize } = require("../middleware/verifyToken");
const {
  register,
  verifyOtp,
  resendOtp,
  createAccount,
  refreshToken,
  logout,
  // updateuserdetails,
} = require("../controllers/authController");

router.post("/registermobile", register);
router.put("/otpverify", verifyOtp);
// router.post("/resendotp", resendOtp);
router.put("/createAccount/:phone", createAccount);
router.post("/refresh-tokens", refreshToken);
router.post("/logout", logout);

module.exports = router;
