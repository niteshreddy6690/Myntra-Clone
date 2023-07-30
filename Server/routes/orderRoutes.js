const router = require("express").Router();
const Order = require("../models/Order");
const { createOrder, getOrders } = require("../controllers/orderController");
const { authorize } = require("../middleware/verifyToken");

// router.post("/addOrder", authorize(), orderController.addOrder);
// router.get("/getOrders", authorize(), orderController.getOrders);

//

router.post("/addOrder", authorize(), createOrder);
router.get("/getOrders", authorize(), getOrders);

module.exports = router;
