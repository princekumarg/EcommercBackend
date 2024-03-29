const router=require('express').Router();
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');
const cartController=require('../controllers/cart');

//CREATE
router.post('/',verifyTokenAndAuthorization,cartController.create);

//UPDATE
router.put('/:id',verifyTokenAndAuthorization,cartController.update);

//DELETE
router.delete('/:id',verifyTokenAndAuthorization,cartController.delete);

//GET USER CART
router.get('/find/:userId',verifyTokenAndAuthorization,cartController.getUserCart);

//GET ALL
router.get('/',verifyTokenAndAdmin,cartController.getAll);

module.exports=router;
