const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const posts = require('../controllers/posts');
const { isLoggedIn, isAuthor, validatePost } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router
  .route('/')
  .get(catchAsync(posts.index))
  .post(
    isLoggedIn,
    upload.array('image'),
    validatePost,
    catchAsync(posts.createPost)
  );

router.get('/new', isLoggedIn, posts.renderNewForm);

router
  .route('/:id')
  .get(catchAsync(posts.getPostById))
  .put(
    isLoggedIn,
    upload.array('image'),
    validatePost,
    isAuthor,
    catchAsync(posts.updatePost)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(posts.deletePost));

router.get('/:id/edit', isAuthor, isLoggedIn, catchAsync(posts.renderEditForm));

module.exports = router;
