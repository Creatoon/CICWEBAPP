const express = require('express');

const musicController = require('./../controllers/musicController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(musicController.getAllMusic)
  .post(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    musicController.uploadMusicFiles,
    musicController.createMusic
  );

router.get('/Ghazals', musicController.getAllGhazals);
router.get('/Devotional', musicController.getAllDevotional);
router.get('/Bhojpuri', musicController.getAllBhojpuri);
router.get('/Karaoke', musicController.getAllKaraoke);

router.route('/name/:name').get(musicController.getMusicByName);
router
  .route('/:id')
  .get(musicController.getMusic)
  .patch(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    musicController.uploadMusicFiles,
    musicController.updateMusic
  )
  .delete(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    musicController.deleteMusic
  );

module.exports = router;
