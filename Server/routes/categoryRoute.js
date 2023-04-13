const router = require("express").Router();
const { roles } = require("../utils/Constants");
const categoryController = require("../controllers/categoryController");

router.post("/", categoryController.createCategory);
router.get("/:parentId", categoryController.getAllCategory);
router.delete("/:id", categoryController.deleteCategories);

module.exports = router;
