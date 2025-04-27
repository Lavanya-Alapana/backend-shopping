const mongoose=require('mongoose');

const ProductSchema= new mongoose.Schema(
    {
        brand:String,
        originalPrice:Number,
        discountPrice:Number,
        description:String,
        image:String,
        category:String,      

    }
)

module.exports=mongoose.model("Product",ProductSchema)