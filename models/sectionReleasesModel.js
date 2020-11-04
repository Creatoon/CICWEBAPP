const mongoose = require('mongoose');

const sectionReleasesSchema = new mongoose.Schema(
  {
    primaryHeading: {
      type: String,
      required: [true, 'A main heading is required']
    },
    paragraphOne: {
      type: String,
      required: [true, 'A paragraph is required']
    },
    paragraphTwo: {
      type: String
    },
    paragraphThree: {
      type: String
    },
    primaryImageYoutubeLink: {
      type: String
    },
    secondaryImageYoutubeLink: {
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

const Releases = mongoose.model('Releases', sectionReleasesSchema);

module.exports = Releases;
