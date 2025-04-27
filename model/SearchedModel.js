const mongoose=require('mongoose');

const SearchedSchema=new mongoose.Schema({
    name:String,
    brand:String,
    originalPrice:Number,
    discountedPrice:Number,
    discountPercentage:Number,
    imageUrl:String,
    category:String,
    stock:Number,
    refurbshied:Boolean

})

module.exports=mongoose.model('Searched',SearchedSchema);