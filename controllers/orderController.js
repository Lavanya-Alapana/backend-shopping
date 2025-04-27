const Order = require("../model/OrderModel");
const Cart = require("../model/CartModel");
const Product = require("../model/ProductModel");

const placeOrder = async (req, res) => {
  try {
    const { userId, address, productId, quantity } = req.body;

    let orderItems = [];
    let totalPrice = 0;
    let name="";

    if (productId && quantity) {
      // ✅ Order a product directly (without cart)
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      orderItems.push({ product: product._id, quantity });
      totalPrice = product.price * quantity;
      name = product.name;
    }
    
    else {
      // ✅ Order a specific product from the cart
      const cart = await Cart.findOne({ user: userId }).populate("items.product");
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      const cartItem = cart.items.find(item => item.product._id.toString() === productId);
      if (!cartItem) {
        return res.status(400).json({ message: "Product not found in cart" });
      }

      orderItems.push({ product: cartItem.product._id, quantity: cartItem.quantity });
      totalPrice = cartItem.product.price * cartItem.quantity;
      name = cartItem.product.name;
    }

    // ✅ Create and save the order
    const newOrder = new Order({
      user: userId,
      name,
      items: orderItems,
      totalPrice,
      address,
      status: "Pending",
      
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
};

const getUserOrders = async (req, res) => {
    try {
      const { userId } = req.params; // Get userId from request params
  
      // Find all orders for the given user
      const orders = await Order.find({ user: userId }).populate("items.product");
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error });
    }
  };

module.exports = { placeOrder,getUserOrders };
