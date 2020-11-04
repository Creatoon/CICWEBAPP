const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

// Authentication Routes
router.get('/login', authController.isLoggedIn, viewsController.getLogin);
router.get('/signup', authController.isLoggedIn, viewsController.getSignup);

router.get('/', authController.isLoggedIn, viewsController.getOverview);

router.get(
  '/music/Devotional',
  authController.isLoggedIn,
  viewsController.getMusicDevotional
);
router.get(
  '/music/Bhojpuri',
  authController.isLoggedIn,
  viewsController.getMusicBhojpuri
);
router.get(
  '/music/Karaoke',
  authController.isLoggedIn,
  viewsController.getMusicKaraoke
);
router.get(
  '/music/Ghazals',
  authController.isLoggedIn,
  viewsController.getMusicGhazals
);
router.get('/music', authController.isLoggedIn, viewsController.getMusic);

router.get(
  '/blogs',
  authController.isLoggedIn,
  viewsController.getBlogsOverview
);

router.get(
  '/blog/:slug',
  authController.isLoggedIn,
  viewsController.getBlogSingle
);

router.get(
  '/directors',
  authController.isLoggedIn,
  viewsController.getDirectors
);

router.get('/location', authController.isLoggedIn, viewsController.getLocation);

router.get('/ask', authController.isLoggedIn, viewsController.getAsk);

router.get(
  '/resetPassword/:token',
  authController.isLoggedIn,
  viewsController.getForgotPassword
);
router.get(
  '/forgotPassword',
  authController.isLoggedIn,
  viewsController.getForgotPasswordPage
);

router.get(
  '/privacy-policy',
  authController.isLoggedIn,
  viewsController.getPrivacyPolicy
);

router.get('/terms', authController.isLoggedIn, viewsController.getTerms);

router.get('/contact-us', authController.isLoggedIn, viewsController.contactUs);

router.get('/refund-policy', authController.isLoggedIn, viewsController.refund);

//router.get('/loaderio-7bf72309a698a873a411af93a9c00dbe' , viewsController.loadTester);

module.exports = router;
