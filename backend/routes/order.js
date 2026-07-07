const express = require("express");
const {
  createOrder,
  getOrders,
  updateOrderStatus
} = require("../controllers/orderController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const router = express.Router();

router.post("/", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.put("/:id", verifyToken, verifyAdmin, updateOrderStatus);

module.exports = router;
