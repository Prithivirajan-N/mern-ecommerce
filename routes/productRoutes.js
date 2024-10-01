const express = require('express');
const {productAdd,productGet,productDelete}=require('../controllers/productController');
const router = express.Router();
const {protect} = require('../controllers/authController');

//add to cart
router.post('/products',protect,productAdd);
//cart detail get
router.get('/my-products',protect,productGet);
//cart delete
router.delete('/orders/:id',protect,productDelete);

module.exports = router;