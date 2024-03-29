const User=require("../models/User")
const CryptoJS=require('crypto-js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
exports.register=async(req,res)=>{
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:await bcrypt.hash(req.body.password,(saltOrRounds=10)),
    });
    try{
        const savedUser=await newUser.save();
        res.status(201).json(savedUser);

    }catch(err){
        return res.status(500).json(err);
    }
};
exports.login=async(req,res)=>{
    try{
        const user=await User.findOne({username:req.body.username});
        !user&&res.status(401).json("Wrong User Name");
        const inputPassword=req.body.password;
        const originalPassword=await bcrypt.compare(inputPassword,user.password);
        originalPassword!=inputPassword&&res.status(401).json("Wrong Password");
        const accessToken=jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
        const {password,...other}=user._doc;
        res.status(200).json({...other,accessToken});

    }
    catch(err){
        return res.status(500).json(err);
    }

};