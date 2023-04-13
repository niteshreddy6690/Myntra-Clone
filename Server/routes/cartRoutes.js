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
router.post("/", cartController.addItemToCart);
router.get("/", authorize(), cartController.getCart);
router.delete("/empty-cart", cartController.emptyCart);
router.post("/delete", cartController.deleteItemInCart);
router.post("/update", cartController.updateCartItemSizeAndQuantity);

module.exports = router;
