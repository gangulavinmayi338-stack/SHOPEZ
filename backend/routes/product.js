const express = require("express");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const router = express.Router();

router.get("/", getProducts);
router.post("/", verifyToken, verifyAdmin, addProduct);
router.put("/:id", verifyToken, verifyAdmin, updateProduct);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);

module.exports = router;
