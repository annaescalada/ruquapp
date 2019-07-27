'use strict';

const express = require('express');
const router = express.Router();

const { isNotLoggedIn } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('dashboard');
});

module.exports = router;
