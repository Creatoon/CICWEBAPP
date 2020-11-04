const mongoose = require('mongoose');
const validator = require('validator');
//const bcrypt = require('bcryptjs');

const querySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    minlength: 3
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Please Mention Your Contact Number'],
    maxlength: [10, 'Please Provide Valid Phone Number'],
    minlength: [10, 'Please Provide Valid Phone Number']
  },
  query: {
    type: String,
    required: [true, 'Please Mention Your Query']
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
