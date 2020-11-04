const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const Office = require('../models/officeModel');
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
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWSBucketName,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'officeImages' });
    },
    key: function (req, file, cb) {
      cb(null, `office-${req.params.id}-${Date.now().toString()}.jpeg`);
    }
  }),
  fileFilter: multerFilter
});

exports.uploadOfficeImages = upload.array('officeImages', 3);
exports.getOffice = factory.getOne(Office);
exports.getAllOffice = factory.getAll(Office);
exports.deleteOffice = factory.deleteOne(Office);

exports.createOffice = catchAsync(async (req, res, next) => {
  if (req.files) {
    const arr = [];
    req.files.forEach((el) => {
      arr.push(el.location);
    });
    req.body.officeImages = arr;
  }

  const doc = await Office.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      doc
    }
  });
});

exports.updateOffice = catchAsync(async (req, res, next) => {
  if (req.files) {
    const arr = [];
    req.files.forEach((el) => {
      arr.push(el.location);
    });
    req.body.officeImages = arr;
  }

  console.log(req.files);

  const doc = await Office.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  //console.log(doc);

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});
