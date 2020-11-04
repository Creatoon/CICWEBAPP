const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  razorpay_payment_id: String,
  razorpay_order_id: String,
  razorpay_signature: String,
  musicId: String
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;
