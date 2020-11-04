const express = require('express');

const landingController = require('./../controllers/landingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(landingController.getAllLanding)
  .post(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    landingController.uploadLandingImages,
    landingController.createLanding
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    landingController.uploadLandingImages,
    landingController.updateLanding
  )
  .delete(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    landingController.deleteLanding
  );

module.exports = router;
