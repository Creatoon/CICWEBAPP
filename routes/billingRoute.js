const express = require('express');

const billController = require('./../controllers/billController');

const router = express.Router();

router
  .route(
    '/razorpay_payment_id/:razorpay_payment_id/razorpay_order_id/:razorpay_order_id/razorpay_signature/:razorpay_signature/musicId/:musicId'
  )
  .post(billController.createBill);

module.exports = router;
