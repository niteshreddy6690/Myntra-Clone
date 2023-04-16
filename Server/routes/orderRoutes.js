const router = require("express").Router();
const Order = require("../models/Order");
const orderController = require("../controllers/orderController");

router.post("/addOrder", addOrder);
router.get("/getOrders", getOrders);
router.post("/getOrder", getOrder);

module.exports = router;
