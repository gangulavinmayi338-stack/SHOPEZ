const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [{
    productId: { type: String, required: true },
    name: String,
    price: Number,
    quantity: Number
  }],
  total: { type: Number, required: true },
  shipping: {
    name: String,
    address: String,
    phone: String,
    paymentMethod: String
  },
  status: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
