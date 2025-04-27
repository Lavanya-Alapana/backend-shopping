const express=require('express');

const {importProducts, getAllProducts } =require('../controllers/productController');

const router=express.Router();

router.post('/import',importProducts);

router.get('/allProducts',getAllProducts);

module.exports=router