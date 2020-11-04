const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  musicName: {
    type: String,
    required: [true, 'Please add the music name']
  },
  premium: {
    type: String,
    required: [true, 'Please add the short music url']
  },
  trial: {
    type: String,
    required: [true, 'Please add the short music url']
  },
  price: {
    type: Number,
    required: [true, 'Please add the free music url']
  },
  type: {
    type: String,
    required: [true, 'A music type is required'],
    enum: ['Devotional', 'Ghazals', 'Bhojpuri Tracks', 'Karaoke']
  },
  youtubeLink: {
    type: String,
    required: [true, 'A video link is required unless put the channel link']
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

musicSchema.index({ date: 1 });

musicSchema.pre('save', function (next) {
  this.price = this.price * 100;
  next();
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
