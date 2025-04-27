const mongoose=require('mongoose');

const DealsSchema =new mongoose.Schema(
    {
        image:String,
        title:String,
        subtitle:String,
        price:String
        
    }
    ,
    { timestamps: true }
)

module.exports=mongoose.model("Deals",DealsSchema)