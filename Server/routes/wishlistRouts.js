const router = require("express").Router();
const {
  addItemToWishList,
  getWishlist,
  removeProductFromWishlist,
  findProductInWishlist,
} = require("../controllers/wishlistController");

router.post("/", addItemToWishList);
router.get("/", getWishlist);
router.delete("/:id", removeProductFromWishlist);
router.get("/:id", findProductInWishlist);

module.exports = router;
