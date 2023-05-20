const Address = require("../models/Address");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  authorize,
} = require("../utils/verifyToken");
const addressController = require("../Controllers/addressController");

router.post("/add", authorize(), addressController.addAddress);
router.put("/edit", authorize(), addressController.editAddress);
router.get("/", authorize(), addressController.getAddress);
router.put("/", authorize(), addressController.deleteAddress);

module.exports = router;
