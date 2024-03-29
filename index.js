const express=require('express');
const app=express();

const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db');

dotenv.config()
connectDB();

app.use(cors())
app.use(express.json())

app.listen(process.env.PORT || 5000,()=>{
    console.log("server is running");
})