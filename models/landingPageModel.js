const mongoose = require('mongoose');

const landingSchema = new mongoose.Schema(
  {
    imagePc: {
      type: String,
      required: [true, 'header image is required']
    },
    imageMobile: {
      type: String,
      required: [true, 'header image is required']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Landing = mongoose.model('Landing', landingSchema);

module.exports = Landing;
