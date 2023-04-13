const router = require("express").Router();
const {
  addItemToWishList,
  getWishlist,
  removeProductFromWishlist,
  findProductInWishlist,
} = require("../controllers/wishlistController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  authorize,
} = require("../utils/verifyToken");

router.post("/", authorize(), addItemToWishList);
router.get("/", authorize(), getWishlist);
router.delete("/:id", authorize(), removeProductFromWishlist);
router.get("/:id", authorize(), findProductInWishlist);

module.exports = router;
