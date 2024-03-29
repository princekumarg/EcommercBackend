const mongoose=require('mongoose');
require('dotenv').config();

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDB connected")
    }
    catch(err){
        console.log("DB connection failed")
    }
};

module.exports=connectDB;