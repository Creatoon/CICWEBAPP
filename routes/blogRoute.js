const express = require('express');

const authController = require('./../controllers/authController');
const blogController = require('./../controllers/blogController');

const router = express.Router();

router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    blogController.uploadBlogFiles,
    blogController.createBlogs
  );

router
  .route('/:id')
  .get(authController.isLoggedIn, blogController.getBlogById)
  .patch(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    blogController.uploadBlogFiles,
    blogController.updateBlog
  )
  .delete(
    authController.protect,
    authController.restrictTo(process.env.MYROLE),
    blogController.deleteBlog
  );

module.exports = router;
