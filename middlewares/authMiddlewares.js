'use strict';

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

const isSignUpFormFilled = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect(req.path);
  }
  next();
};

const isLogInFormFilled = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    req.flash('loginMissingFields', 'Please introduce your email and password to log in');
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
