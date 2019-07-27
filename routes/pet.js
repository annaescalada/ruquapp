'use strict';

const express = require('express');
const router = express.Router();

const { isNotLoggedIn, isLogInFormFilled } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/add', isNotLoggedIn, (req, res, next) => {
  res.render('addPet');
});

router.post('/add', isNotLoggedIn, (req, res, next) => {
  //
});

module.exports = router;
