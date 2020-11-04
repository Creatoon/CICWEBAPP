const Bill = require('../models/billingModel');
const Music = require('../models/musicModel');
const catchAsync = require('./../utils/catchAsync');

exports.createBill = catchAsync(async (req, res, next) => {
  const music = await Music.findById(req.params.musicId);

  //const musicLink = music.premium;
  const doc = await Bill.create(req.params);

  res.status(201).json({
    status: 'success',
    data: doc
  });

  // console.log(req.params.musicId);
});
