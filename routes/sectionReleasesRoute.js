const express = require('express');

const releasesController = require('./../controllers/releasesController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(releasesController.getAllReleases)
  .post(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    releasesController.uploadReleasesFiles,
    releasesController.createReleases
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    releasesController.uploadReleasesFiles,
    releasesController.updateReleases
  )
  .delete(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    releasesController.deleteReleases
  );

module.exports = router;
