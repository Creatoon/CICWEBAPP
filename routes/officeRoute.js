const express = require('express');

const officeController = require('./../controllers/officeController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(officeController.getAllOffice)
  .post(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    officeController.createOffice
  );

router
  .route('/:id')
  .get(officeController.getOffice)
  .patch(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    officeController.uploadOfficeImages,
    officeController.updateOffice
  )
  .delete(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    officeController.deleteOffice
  );

module.exports = router;
