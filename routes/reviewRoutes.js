const express=require('express');

const {reviewProducts,getReviews}=require('../controllers/reviewController');

const router=express.Router();

router.post('/addReview',reviewProducts);
router.get('/getReview',getReviews);

module.exports=router;