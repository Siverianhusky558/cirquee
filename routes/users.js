const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { isLoggedIn, isProfileAuthor } = require('../middleware');

router.get('/users', async (req, res) => {
  const users = await User.find({});
  res.render('users/index', { users });
});

router
  .route('/register')
  .get(users.renderRegister)
  .post(upload.single('avatar'), catchAsync(users.register));

router.get('/notifications', isLoggedIn, users.getNotifications);

router
  .route('/login')
  .get(users.renderLogin)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
    }),
    users.login
  );

router.get('/logout', users.logout);

router
  .route('/users/:userId')
  .get(users.getUserById)
  .put(isProfileAuthor, users.editUser);

router.get('/users/:userId/edit', isProfileAuthor, users.renderEditForm);

router.get('/follow/:id', isLoggedIn, users.followUser);

// router.get('/unfollow/:id', isLoggedIn, users.unFollowUser);

router.get('/notifications/:id', isLoggedIn, users.handleNotification);

module.exports = router;
