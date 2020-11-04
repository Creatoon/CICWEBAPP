const mongoose = require('mongoose');
const validator = require('validator');

const officeSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now()
    },
    placeName: {
      type: String,
      unique: true,
      required: [true, 'Office Name is required']
    },
    adressLine: {
      type: String,
      required: [true, 'Adress is required']
    },
    pinCode: {
      type: String
    },
    landmark: {
      type: String
    },
    officeContactNumber: {
      type: String,
      required: [true, 'Office Contact Number Is Nedded']
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    mapLink: {
      type: String,
      required: [true, 'Link to map is required']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Office = mongoose.model('Office', officeSchema);

module.exports = Office;
