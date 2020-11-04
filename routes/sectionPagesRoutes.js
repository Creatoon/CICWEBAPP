const express = require('express');

const sectionPagesController = require('./../controllers/sectionPagesController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(sectionPagesController.getAllSections)
  .post(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    sectionPagesController.uploadSectionFiles,
    sectionPagesController.createSections
  );

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    sectionPagesController.uploadSectionFiles,
    sectionPagesController.updateSection
  )
  .delete(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    sectionPagesController.deleteSection
  );
module.exports = router;
