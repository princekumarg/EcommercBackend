const Product =require('../models/Product')
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
}=require('../middleware/verifyToken');

exports.create=async(req,res)=>{
    const newProduct=new Product(req.body);
    try {
        const savedProduct=await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.update=async(req,res)=>{
    try {
        const updatedProduct=await Product.findByIdAndUpdate(req.params.id,
            {
                $set:req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedProduct);
    }catch (error) {
        res.status(500).json(error);
    }
};
exports.delete=async(req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
}
exports.getProduct=async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id);
        res.status(200).json(product);
    }catch (error) {
        res.status(500).json(error);
    }
};
exports.getAll=async(req,res)=>{
    const qNew=req.query.new;
    const qCategory=req.query.category;
    try {
        let products;
        if(qNew){
            products=await Product.find().sort({createdAt:-1}).limit(1);
        }else if(qCategory){
            products=await Product.find({
                categories:{
                    $in:[qCategory],
                },
            });
        }else{
            products=await Product.find();
        }
    } catch (error) {
        res.status(500).json(error);
    }
}