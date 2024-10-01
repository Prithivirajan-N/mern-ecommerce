const express = require('express');
const{login,signup, payment}=require('../controllers/authController')
const router = express.Router();

//login user
router.post('/login',login);
//signup user
router.post('/signup',signup);
//payment
router.post('/payment',payment);

module.exports = router;