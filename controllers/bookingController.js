//const crypto = require('crypto');

const razorpay = require('razorpay');

//const shortId = require('shortid');

const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const Music = require('../models/musicModel');
//const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
//const AppError = require('./../utils/appError');

let music;

exports.createOrder = catchAsync(async (req, res, next) => {
  // 1) Getting The Music
  music = await Music.findById(req.params.musicId);

  // console.log(music);

  // 2) razorpay

  const options = {
    amount: `${music.price}`,
    currency: 'INR',
    notes: {
      userEmail: req.user.email,
      userName: req.user.name,
      musicName: `${music.musicName}`,
      brandLogo: `${music.image}`,
      premium: `${music.premium}`
    }
  };

  let doc;

  try {
    doc = await instance.orders.create(options);
  } catch (err) {
    console.log(err);
  }

  console.log(doc);

  res.status(201).json({
    status: 'success',
    data: doc
  });
});

// exports.webhookCheckout = (req, res, next) => {
//   const SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

//   const shasum = crypto.createHmac('sha256', SECRET);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest('hex');

//   if (digest === req.headers['x-razorpay-signature']) {
//     console.log(req.body);
//   } else {
//     console.log('request is not authenticated');
//   }

//   res.status(200).json({
//     status: 'success'
//   });
// };
