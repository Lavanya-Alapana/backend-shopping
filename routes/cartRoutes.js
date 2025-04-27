const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");
const { addToCart, getCart, removeFromCart, updateCartItem, clearCart } = require("../controllers/cartController");

router.post("/add", authenticateUser, addToCart);
router.get("/", authenticateUser, getCart);
router.delete("/remove", authenticateUser, removeFromCart);
router.put("/update", authenticateUser, updateCartItem);
router.delete("/clear", authenticateUser, clearCart);

module.exports = router;
