const router=require('express').Router();
const crypto=require('crypto-js');
const Razorpay=require('razorpay');
const razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET,
});
const secret_key=process.env.PASS_SEC;
router.post('/order',async (req,res)=>{
    const options={
        amount:req.body.amount,
        currency:req.body.currency,
        receipt:"receipt#1",
        payment_capture:1,
    };
    try {
        const response=await razorpay.orders.create(options);
        res.json({
            id:response.id,
            currency:response.currency,
            amount:response.amount,
        });
    } catch (error) {
        res.status(400).send('Not able to create order. Please try again!');
    }
});
//Api route payment capture
router.post('/paymentCapture',async (req,res)=>{
    const data=crypto.createHmac('sha256',secret_key)
    data.update(JSON.stringify(req.body));
    const digest=data.digest('hex');
    if(digest===req.headers['x-razorpay-signature']){
        console.log('request is legit');
        res.json({status:'ok'});
    }else{
        res.status(403).send('Invalid payment');
    }
})
//refund api
router.post('/refund',async (req,res)=>{
    try {
        const options={
            payment_id:req.body.payment_id,
            amount:req.body.amount,
        };
        const response=await razorpay.refund(options)
        
        res.send('Successfully refunded',response)
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Not able to refund');
    }
});
module.exports=router;


