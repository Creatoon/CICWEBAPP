const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    primaryHeading: {
      type: String,
      required: [true, 'A main heading is required']
    },
    secondaryHeading: {
      type: String,
      required: [true, 'A secondary heading is required']
    },
    sectionId: {
      type: String
    },
    paragraph: {
      type: String,
      required: [true, 'A paragraph is required']
    },
    anchorLink: {
      type: String
    },
    mainClass: {
      type: String,
      enum: ['section-films', 'section-picture'],
      required: [true, 'A main class is needed']
    },
    additionalSettings: {
      type: String
    },
    imagePrimary: {
      type: String
    },
    imageSecondary: {
      type: String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;
