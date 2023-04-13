const router = require("express").Router();
const { verifyToken } = require("../utils/verifyToken");

router.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected Rout" });
});

module.exports = router;
