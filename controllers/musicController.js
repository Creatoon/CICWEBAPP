const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const Music = require('../models/musicModel');
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
        `${req.body.musicName}-${file.fieldname}${
          file.mimetype.split('/')[0] === 'audio' ? '.mp3' : '.jpeg'
        }`
      );
    }
  })
});

exports.uploadMusicFiles = upload.fields([
  { name: 'premium', maxCount: 1 },
  { name: 'trial', maxCount: 1 },
  { name: 'image', maxCount: 1 }
]);

exports.getMusic = factory.getOne(Music);
exports.getAllMusic = factory.getAll(Music);
exports.deleteMusic = factory.deleteOne(Music);

exports.createMusic = catchAsync(async (req, res, next) => {
  //  console.log(req.body);
  if (req.files) {
    console.log(req.files);
    req.body.trial = req.files.trial[0].location;
    req.body.premium = req.files.premium[0].location;
    req.body.image = req.files.image[0].location;
  }

  const doc = await Music.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      doc
    }
  });
});

exports.updateMusic = catchAsync(async (req, res, next) => {
  if (req.files) {
    req.body.trial = req.files.trial[0].location;
    req.body.premium = req.files.premium[0].location;
    req.body.image = req.files.image[0].location;
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

exports.getAllGhazals = catchAsync(async (req, res, next) => {
  const doc = await Music.find({ type: 'Ghazals' });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      doc
    }
  });
});

exports.getAllDevotional = catchAsync(async (req, res, next) => {
  const doc = await Music.find({ type: 'Devotional' });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      doc
    }
  });
});

exports.getAllKaraoke = catchAsync(async (req, res, next) => {
  const doc = await Music.find({ type: 'Karaoke' });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      doc
    }
  });
});

exports.getAllBhojpuri = catchAsync(async (req, res, next) => {
  const doc = await Music.find({ type: 'Bhojpuri' });

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      doc
    }
  });
});

exports.getMusicByName = catchAsync(async (req, res, next) => {
  const fin = new RegExp(`^${req.params.name}`);

  console.log(fin);

  const filter = { musicName: { $in: [fin] } };

  const doc = await Music.find(filter);

  if (!doc) {
    return next(new AppError('No document found', 404));
  }

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      doc
    }
  });
});
