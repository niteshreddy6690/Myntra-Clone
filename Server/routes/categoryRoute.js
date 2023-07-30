const router = require("express").Router();
const { roles } = require("../utils/Constants");
const categoryController = require("../controllers/categoryController");
const { authorize } = require("../middleware/verifyToken");

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategory);
router.delete(
  "/:id",
  authorize(roles.admin),
  categoryController.deleteCategories
);

module.exports = router;
