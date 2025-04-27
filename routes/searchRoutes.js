const express=require('express')

const {searchProducts,getProducts}=require('../controllers/searchedController')

const router=express.Router();

router.post('/addProducts',searchProducts);
router.get('/getProducts',getProducts)

module.exports=router