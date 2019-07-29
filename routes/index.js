'use strict';

const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/', isLoggedIn, (req, res, next) => {
  const data = {
    message1: req.flash('loginMissingFields'),
    message2: req.flash('noEmailInDB'),
    message3: req.flash('wrongPassword'),
    email: req.flash('emailRecoverLogIn')
  };
  res.render('index', data);
});

module.exports = router;
