const router = require("express").Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { roles } = require("../utils/Constants");
const cartController = require("../Controllers/cartController");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  authorize,
} = require("../utils/verifyToken");
router.post("/", authorize(), cartController.addItemToCart);
router.get("/", authorize(), cartController.getCart);
router.delete("/empty-cart", authorize(), cartController.emptyCart);
router.post("/delete", authorize(), cartController.deleteItemInCart);
router.post(
  "/update",
  authorize(),
  cartController.updateCartItemSizeAndQuantity
);

module.exports = router;
