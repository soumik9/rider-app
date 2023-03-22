const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/paymentController');
const verifyLogin = require("../middleware/verifyLogin");

//routes
router.post('/create-checkout-session', verifyLogin, PaymentController.payment);

module.exports = router;