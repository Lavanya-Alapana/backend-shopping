const express = require("express");
const { placeOrder,getOrders } = require("../controllers/orderController");

const router = express.Router();


router.post("/place", placeOrder);

router.get('/get',getOrders);





module.exports = router;
