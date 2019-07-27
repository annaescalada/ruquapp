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

const isLogInFormFilled = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.redirect(req.path);
  }
  next();
};

module.exports = {
  isLoggedIn,
  isNotLoggedIn,
  isLogInFormFilled
};
