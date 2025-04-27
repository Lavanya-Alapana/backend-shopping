const mongoose=require('mongoose');

const ReviewSchema=new mongoose.Schema({
    name:String,
    profilePic:String,
    rating:Number,
    comment:String,
    date:Date
})

module.exports=mongoose.model('Review',ReviewSchema);