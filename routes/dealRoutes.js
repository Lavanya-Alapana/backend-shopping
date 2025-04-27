const express=require('express');
const router=express.Router();
const {addDeal,getDeal} =require("../controllers/dealController");

router.post('/addDeal',addDeal);

router.get('/getDeal',getDeal);

module.exports=router;