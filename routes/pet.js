'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/add', (req, res, next) => {
  res.render('addPet');
});

router.post('/add', (req, res, next) => {
  //
});

module.exports = router;
