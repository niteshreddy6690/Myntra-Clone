const router = require("express").Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const cartController = require("../Controllers/cartController");
router.post("/", cartController.addItemToCart);
router.get("/", cartController.getCart);
router.delete("/empty-cart", cartController.emptyCart);
router.post("/delete", cartController.deleteItemInCart);
router.post("/update", cartController.updateCartItemSizeAndQuantity);

module.exports = router;
