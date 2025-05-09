const Order = require("../model/OrderModel");
const Product = require("../model/ProductModel");
const jwt = require("jsonwebtoken");
const placeOrder = async (req, res) => {
  try {
    const { userId, address, productId, quantity } = req.body;

    // Validate required fields
    if (!userId || !address || !productId || !quantity) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Fetch the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (typeof product.discountPrice !== "number" || product.discountPrice <= 0) {
      return res.status(400).json({ message: "Invalid product price" });
    }

    if (!product.brand) {
      return res.status(400).json({ message: "Product brand is missing" });
    }

    const totalPrice = product.discountPrice * quantity;
    const orderItem = {
      product: product._id,
      quantity,
    };

    // Create order
    const newOrder = new Order({
      user: userId,
      name: product.brand,
      items: [orderItem],
      totalPrice,
      address,
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });

  } catch (error) {
    console.error("Order placement failed:", error);
    res.status(500).json({ message: "Error placing order", error });
  }
};




const getOrders = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Missing Authorization header" });
    }

    const token = authHeader; // No "Bearer " prefix
    const decoded = jwt.verify(token, "mySuperSecretKey123"); // Replace with your secret
    const userId = decoded.id;

    const orders = await Order.find({ user: userId })
      .populate("items.product")
      .exec();

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user." });
    }

    res.status(200).json({ orders });

  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders", error });
  }
};


module.exports = { placeOrder ,getOrders};
