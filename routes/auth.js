'use strict';

const express = require('express');
const router = express.Router();

const { isLoggedIn, isLogInFormFilled } = require('../middlewares/authMiddlewares');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User.js');

/* GET home page. */

router.get('/signup', isLoggedIn, (req, res, next) => {
  // const data = {
  //   messages: req.flash('errorFormNotFilled'),
  //   formData: req.flash('errorDataForm')
  // };
  // res.render('signup', data);
  res.render('signup');
});

router.post('/signup', isLoggedIn, async (req, res, next) => {
  try {
    const { name, surname, phone, email, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.findOne({ email });
    if (user) {
      return res.redirect('/auth/signup');
    }
    const newUser = await User.create({
      name,
      surname,
      phone,
      email,
      password: hashedPassword
    });
    req.session.currentUser = newUser;
    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
});

router.post('/login', isLoggedIn, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect('/');
    }
    if (bcrypt.compareSync(password /* provided password */, user.password/* hashed password */)) {
      // Save the login in the session!
      req.session.currentUser = user;
      console.log('password ok');
      res.redirect('/dashboard');
    } else {
      // req.flash('wrongPassword', 'Wrong password');
      res.redirect('/');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
