const router = require("express").Router();
const {
  getUser,
  getUsers,
  updateUser,
} = require("../controllers/userController");

const { roles } = require("../utils/Constants");
const { authorize } = require("../utils/verifyToken");
router.get("/:id", authorize(), getUser);
router.get("/", authorize(), getUsers);
router.put("/", authorize(), updateUser);
module.exports = router;
