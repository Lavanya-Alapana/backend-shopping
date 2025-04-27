const express = require("express");
const { placeOrder, getUserOrders } = require("../controllers/orderController");

const router = express.Router();


router.post("/place", placeOrder);


router.get("/:userId", getUserOrders);



module.exports = router;
