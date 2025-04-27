const Deals =require("../model/DealsModel");

const addDeal=async(req,res)=>{
    try{
        const{image,title,subtitle,price}=req.body;
        const newDeal=new Deals({image,title,subtitle,price});
        await newDeal.save();
        res.status(201).json(newDeal);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to add flash deal" });
      }
}

const getDeal=async(req,res)=>{
    try{
        const deals=await Deals.find();
        res.status(200).json(deals);


    }
    catch (err) {
        res.status(500).json({ error: "Server Error" });
      }
}
module.exports={addDeal,getDeal}