'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('profile');
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

module.exports = router;
