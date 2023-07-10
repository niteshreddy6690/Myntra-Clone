const router = require("express").Router();
const {
  getUser,
  getUsers,
  updateUser,
  getUserStats,
} = require("../controllers/userController");

const { roles } = require("../utils/Constants");
const { authorize } = require("../utils/verifyToken");

router.get("/:id", authorize(), getUser);
router.get("/", authorize(), getUsers);
router.put("/", authorize(), updateUser);
router.get("/stats/user", authorize(roles.admin), getUserStats);
module.exports = router;
