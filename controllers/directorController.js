const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const Director = require('../models/directorModel');
const factory = require('./handlerFactory');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

aws.config.update({
  secretAccessKey: process.env.SecretAccessKey,
  accessKeyId: process.env.AccessKeyID,
  region: 'us-east-2'
});

const s3 = new aws.S3();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only image.', 400), false);
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWSBucketName,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${req.body.name}-${file.fieldname}.jpeg`);
    }
  }),
  multerFilter
});

exports.uploadDirectorFiles = upload.single('image');

exports.createDirector = catchAsync(async (req, res, next) => {
  //  console.log(req.body);
  if (req.file) {
    req.body.image = req.file.location;
  }

  const doc = await Director.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      doc
    }
  });
});

exports.updateDirector = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.location;
  }

  const doc = await Office.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

exports.getDirector = factory.getOne(Director);
exports.getAllDirector = factory.getAll(Director);
exports.deleteDirector = factory.deleteOne(Director);
