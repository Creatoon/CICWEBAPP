const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const Landing = require('./../models/landingPageModel');
const factory = require('./handlerFactory');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

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

exports.uploadLandingImages = upload.fields([
  { name: 'imagePc', maxCount: 1 },
  { name: 'imageMobile', maxCount: 1 }
]);

exports.createLanding = catchAsync(async (req, res, next) => {
  //  console.log(req.body);
  if (req.files) {
    console.log(req.files);
    req.body.imagePc = req.files.imagePc[0].location;
    req.body.imageMobile = req.files.imageMobile[0].location;
  }

  const doc = await Landing.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      doc
    }
  });
});

exports.updateLanding = catchAsync(async (req, res, next) => {
  if (req.files) {
    console.log(req.files);
    req.body.imagePc = req.files.imagePc[0].location;
    req.body.imageMobile = req.files.imageMobile[0].location;
  }

  const doc = await Landing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      doc
    }
  });
});

exports.getAllLanding = factory.getAll(Landing);
exports.deleteLanding = factory.deleteOne(Landing);
