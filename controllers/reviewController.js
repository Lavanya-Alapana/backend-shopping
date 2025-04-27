const Review=require('../model/ReviewModel');
const fs = require("fs");
const path = require("path");


const filePath = path.join(__dirname, "../Review/data.json");
const reviews = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const reviewProducts=async(req,res)=>{
    try{
        await Review.deleteMany();
        await Review.insertMany(reviews)
        res.status(200).json({message:"Review added successfully"})
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:"Error importing reviews"})
    }
}

const getReviews=async(req,res)=>{
    try{
        const reviews=await Review.find();
        await res.status(200).json(reviews)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
    
}

module.exports={reviewProducts,getReviews}