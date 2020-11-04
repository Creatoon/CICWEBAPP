const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const Releases = require('./../models/sectionReleasesModel');
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
      cb(null, `${req.body.sectionId}-${file.fieldname}.jpeg`);
    }
  })
});

exports.uploadReleasesFiles = upload.fields([
  { name: 'imagePrimary', maxCount: 1 },
  { name: 'imageSecondary', maxCount: 1 }
]);

exports.createReleases = catchAsync(async (req, res, next) => {
  //  console.log(req.body);
  if (req.files) {
    console.log(req.files);
    req.body.imagePrimary = req.files.imagePrimary[0].location;
    req.body.imageSecondary = req.files.imageSecondary[0].location;
  }

  const doc = await Releases.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      doc
    }
  });
});

exports.updateReleases = catchAsync(async (req, res, next) => {
  if (req.files) {
    req.body.imagePrimary = req.files.imagePrimary[0].location;
    req.body.imageSecondary = req.files.imageSecondary[0].location;
  }

  const doc = await Releases.findByIdAndUpdate(req.params.id, req.body, {
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

exports.getAllReleases = factory.getAll(Releases);
exports.deleteReleases = factory.deleteOne(Releases);
