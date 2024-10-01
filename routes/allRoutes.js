const express = require('express');
const router = express.Router();

router.use('/',require('./authRoutes'));
router.use('/',require('./productRoutes'));
router.use('/',require('./orderRoutes'));

module.exports = router;