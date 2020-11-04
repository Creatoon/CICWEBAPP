const express = require('express');

const queryController = require('./../controllers/queryController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(queryController.getAllQueries)
  .post(queryController.createQuery);

router
  .route('/:id')
  .get(queryController.getQuery)
  .patch(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    queryController.updateQuery
  )
  .delete(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    queryController.deleteQuery
  );

module.exports = router;
