const express = require('express');

const authController = require('./../controllers/authController');
const directorController = require('./../controllers/directorController');

const router = express.Router();

router
  .route('/')
  .get(directorController.getAllDirector)
  .post(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    directorController.uploadDirectorFiles,
    directorController.createDirector
  );

router
  .route('/:id')
  .get(directorController.getDirector)
  .patch(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    directorController.uploadDirectorFiles,
    directorController.updateDirector
  )
  .delete(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    directorController.deleteDirector
  );

module.exports = router;
