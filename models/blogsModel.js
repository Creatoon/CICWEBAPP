const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now()
    },
    title: {
      type: String,
      unique: true,
      required: [true, 'A title is required']
    },
    slug: String,
    readingTime: {
      type: String,
      required: [true, 'Reading time is required']
    },
    textContent: {
      type: String,
      required: [true, 'A main body is required']
    },
    anchorLink: {
      type: String
    },
    authorName: {
      type: String,
      required: [true, 'Author name is needed']
    },
    authorImage: {
      type: String
    },
    blogImageSmall: {
      type: String
    },
    blogImageBig: {
      type: String
    },
    emailMessage: {
      type: String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

blogSchema.index({ date: -1 });

blogSchema.pre('save', function (next) {
  console.log('entered');
  this.slug = slugify(this.title, { lower: true });
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
