const Address = require("../models/Address");
const router = require("express").Router();
const { authorize } = require("../middleware/verifyToken");
const addressController = require("../controllers/addressController");

router.post("/add", authorize(), addressController.addAddress);
router.put("/edit", authorize(), addressController.editAddress);
router.get("/", authorize(), addressController.getAddress);
router.put("/", authorize(), addressController.deleteAddress);

module.exports = router;
