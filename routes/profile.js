'use strict';

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User');
/* GET home page. */
router.get('/', (req, res, next) => {
  const user = req.session.currentUser;
  res.render('profile', user);
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

router.post('/edit', async (req, res, next) => {
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

router.post('/edit-password', async (req, res, next) => {
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
