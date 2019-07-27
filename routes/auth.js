'use strict';

const express = require('express');
const router = express.Router();

const { isLoggedIn, isLogInFormFilled, isSignUpFormFilled } = require('../middlewares/authMiddlewares');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User.js');

/* GET home page. */

router.get('/signup', isLoggedIn, (req, res, next) => {
  const data = {
    message: req.flash('signUpMissingFields'),
    exisitingUser: req.flash('existingUser'),
    invalidEmail: req.flash('invalidEmail'),
    name: req.flash('nameRecover'),
    surname: req.flash('surnameRecover'),
    phone: req.flash('phoneRecover')
  };
  res.render('signup', data);
});

router.post('/signup', isLoggedIn, isSignUpFormFilled, async (req, res, next) => {
  try {
    const { name, surname, phone, email, password } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // const user = await User.findOne({ email });
    // if (user) {
    //   return res.redirect('/auth/signup');
    // }
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

router.post('/login', isLoggedIn, isLogInFormFilled, async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('noEmailInDB', 'Your email account is not registered. Please sign up.');
      return res.redirect('/');
    }
    if (bcrypt.compareSync(password /* provided password */, user.password/* hashed password */)) {
      // Save the login in the session!
      req.session.currentUser = user;
      console.log('password ok');
      res.redirect('/dashboard');
    } else {
      req.flash('wrongPassword', 'Incorrect password.');
      res.redirect('/');
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
