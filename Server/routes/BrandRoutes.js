const Brand = require("../models/Brand");
const router = require("express").Router();
const { authorize } = require("../middleware/verifyToken");
const { roles } = require("../utils/Constants");
const brandController = require("../controllers/brandController");

router.post("/", authorize(roles.admin), brandController.createBrand);
router.put("/:id", authorize(roles.admin), brandController.updateBrand);
router.delete("/:id", authorize(roles.admin), brandController.deleteBrand);
router.get("/", authorize(roles.admin), brandController.getAllBrand);

module.exports = router;
