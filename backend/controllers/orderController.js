const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const { products, total, shipping } = req.body;
    const formattedProducts = products.map((product) => ({
      productId: product.productId || product.id || "",
      name: product.name,
      price: product.price,
      quantity: product.quantity
    }));
    const order = await Order.create({
      userId: req.user.id,
      products: formattedProducts,
      total,
      status: "Pending",
      shipping
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

const getOrders = async (req, res) => {
  try {
    const filters = req.user.isAdmin ? {} : { userId: req.user.id };
    const orders = await Order.find(filters).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order", error });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus };
