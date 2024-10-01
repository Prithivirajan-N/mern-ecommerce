const express = require('express');
const{orderAdd,orderGet,orderDelete}=require('../controllers/orderController');
const router = express.Router();
const{protect}=require('../controllers/authController');
//placing order
router.post('/orders',protect,orderAdd);
//get order details
router.get('/my-orders',protect,orderGet);
//delete order
router.get('/orders/:id',protect,orderDelete);


module.exports = router;
