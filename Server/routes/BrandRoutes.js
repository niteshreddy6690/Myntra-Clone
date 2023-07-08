const Brand = require("../models/Brand");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  authorize,
} = require("../utils/verifyToken");
const { roles } = require("../utils/Constants");
const brandController = require("../Controllers/brandController");

router.post("/", authorize(roles.user), brandController.createBrand);
router.put("/:id", authorize(roles.user), brandController.updateBrand);
router.delete("/:id", authorize(), brandController.deleteBrand);
router.get("/", brandController.getAllBrand);

module.exports = router;
