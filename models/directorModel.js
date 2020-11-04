const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A director must have a name']
  },
  image: {
    type: String
  },
  designation: {
    type: String,
    required: [true, 'A director must have a designation']
  },
  paraOne: {
    type: String
  },
  paraTwo: {
    type: String
  },
  paraThree: {
    type: String
  },
  paraFour: {
    type: String
  }
});

const Director = mongoose.model('Director', directorSchema);

module.exports = Director;
