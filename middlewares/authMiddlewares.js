'use strict';
const User = require('../models/User.js');

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/dashboard');
  }
  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isSignUpFormFilled = async (req, res, next) => {
  try {
    const { name, surname, phone, email, password } = req.body;

    if (name) {
      req.flash('nameRecover', name);
    }
    if (surname) {
      req.flash('surnameRecover', surname);
    }
    if (phone) {
      req.flash('phoneRecover', phone);
    }
    const user = await User.findOne({ email });
    if (user) {
      req.flash('existingUser', 'This email is registered, try another one');
      return res.redirect('/auth/signup');
    }

    if (email) {
      req.flash('emailRecover', email);
    }

    if (!name || !surname || !phone || !email || !password) {
      req.flash('signUpMissingFields', 'All fields are required');
      return res.redirect('/auth/signup');
    }

    if (!email.includes('@') || !email.includes('.')) {
      req.flash('invalidEmail', 'Please, introduce a valid email');
      return res.redirect('/auth/signup');
    }
    next();
  } catch (error) {
    next(error);
  }
};

const isLogInFormFilled = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('loginMissingFields', 'All fields are required');
    return res.redirect('/');
  }
  next();
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isLogInFormFilled,
  isSignUpFormFilled
};
