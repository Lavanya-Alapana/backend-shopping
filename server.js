const express=require('express');
const cors=require('cors');
const mongoose =require('mongoose');
const dotenv=require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes=require('./routes/productRoutes');
const cartRoutes=require('./routes/cartRoutes');
const orderRoutes = require("./routes/orderRoutes");
const dealRoutes = require("./routes/dealRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const searchRoutes=require("./routes/searchRoutes");

const reviewRoutes=require('./routes/reviewRoutes')
const app=express();


require('dotenv').config(); // Import dotenv at the top


app.use(cors());

app.use(express.json());

app.use('/api', authRoutes);

app.use('/api/products',productRoutes);

app.use('/api/cart',cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/deal",dealRoutes);

app.use("/api/search",searchRoutes)

app.use("/api/review",reviewRoutes);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log('DB connected successfully')})
.catch((err)=>{console.log(err)})


app.get('/',(req,res)=>{
    res.send('sending the request');
})

app.listen(8000,()=>{console.log('Server running successfullly')});