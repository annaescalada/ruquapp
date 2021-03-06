'use strict';

const express = require('express');
const router = express.Router();

const { isNotLoggedIn, isEditInfoFormFilled, isEditPassFormFilled } = require('../middlewares/authMiddlewares');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User');

router.get('/', isNotLoggedIn, (req, res, next) => {
  const user = req.session.currentUser;
  const data = {
    errorInfo: req.flash('editProfileInfo'),
    errorPass: req.flash('editPassword'),
    user
  };
  res.render('profile', data);
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

router.post('/edit', isNotLoggedIn, isEditInfoFormFilled, async (req, res, next) => {
  try {
    const { name, surname, phone } = req.body;
    const currentUserID = req.session.currentUser._id;
    await User.findByIdAndUpdate(currentUserID, { name, surname, phone });
    const newUser = await User.findById(currentUserID);
    req.session.currentUser = newUser;
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});

router.post('/edit-password', isNotLoggedIn, isEditPassFormFilled, async (req, res, next) => {
  try {
    const { password } = req.body;
    const currentUserID = req.session.currentUser._id;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    await User.findByIdAndUpdate(currentUserID, { password: hashedPassword });
    const newUser = await User.findById(currentUserID);
    req.session.currentUser = newUser;
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
