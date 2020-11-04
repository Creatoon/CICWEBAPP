const express = require('express');

const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router();

router.post(
  '/:musicId/orders',
  authController.protect,
  bookingController.createOrder
);

module.exports = router;
