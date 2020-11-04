const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const AppError = require('./../utils/appError');

const Blog = require('./../models/blogsModel');
const factory = require('./handlerFactory');
const queryEmail = require('./../utils/queryEmail');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

aws.config.update({
  secretAccessKey: process.env.SecretAccessKey,
  accessKeyId: process.env.AccessKeyID,
  region: 'us-east-2'
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWSBucketName,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(
        null,
        `${req.body.title.split(' ').join('')}-${
          file.fieldname
        }-${Date.now()}.jpeg`
      );
    }
  })
});

exports.uploadBlogFiles = upload.fields([
  { name: 'blogImageSmall', maxCount: 1 },
  { name: 'blogImageBig', maxCount: 1 }
]);

exports.getAllBlogs = factory.getAll(Blog);

exports.createBlogs = catchAsync(async (req, res, next) => {
  console.log('yes');

  if (req.files) {
    console.log(req.files);
    req.body.blogImageBig = req.files.blogImageBig[0].location;
    req.body.blogImageSmall = req.files.blogImageSmall[0].location;
  }

  const doc = await Blog.create(req.body);

  // 1) Get users from collection
  const users = await User.find().select('email');

  // 2) users is an array so we need to loop over array and get allthe emails together
  let mailingListArray = [];

  users.forEach((el) => {
    mailingListArray.push(el.email);
  });

  const mailingList = mailingListArray.toString();

  const slug = req.body.title.toLowerCase().split(' ').join('-');

  const url = `${req.protocol}://${req.get('host')}/blog/${slug}`;
  console.log(url);

  await queryEmail.emailToMailingList(mailingList, req.body.emailMessage, url);

  res.status(201).json({
    status: 'success',
    data: {
      doc
    }
  });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  if (req.files) {
    req.body.blogImageBig = req.files.blogImageBig[0].location;
    req.body.blogImageSmall = req.files.blogImageSmall[0].location;
  }

  const doc = await Music.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  // console.log(doc);

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.getBlogById = factory.getOne(Blog);
exports.deleteBlog = factory.deleteOne(Blog);
