const Product = require("../model/ProductModel");
const fs = require("fs");
const path = require("path");


const filePath = path.join(__dirname, "../data/data.json");
const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));


const importProducts = async (req, res) => {
  try {
    await Product.deleteMany(); // Clears existing products
    await Product.insertMany(products); // Inserts new data
    res.status(201).json({ message: "Products imported successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error importing products" });
  }
};


const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { importProducts, getAllProducts };
