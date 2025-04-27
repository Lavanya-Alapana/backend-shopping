const Search=require('../model/SearchedModel');
const fs = require("fs");
const path = require("path");


const filePath = path.join(__dirname, "../SearchedData/data.json");
const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));


const searchProducts = async(req,res) =>{
    try{
        await Search.deleteMany();
        await Search.insertMany(products)
        res.status(200).json({message:"Search product added Successfully"})
    }
    catch(error)
    {   console.log(error)
        res.status(500).json({message:"Error importing products"})
    }
    
}

const getProducts= async(req,res)=>{
    try{
        const products=await Search.find()
        res.status(200).json(products)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:"server Error"})
    }
}

module.exports={searchProducts,getProducts}
