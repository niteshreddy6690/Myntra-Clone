const router = require("express").Router();
const {
  getUser,
  getUsers,
  updateUser,
} = require("../controllers/userController");

const { roles } = require("../utils/Constants");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  authorize,
} = require("../utils/verifyToken");

router.get("/:id", getUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
module.exports = router;
