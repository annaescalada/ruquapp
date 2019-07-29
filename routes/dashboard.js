'use strict';

const express = require('express');
const router = express.Router();

const User = require('../models/User.js');
const Dog = require('../models/Dog.js');

const { isNotLoggedIn } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/', isNotLoggedIn, async (req, res, next) => {
  const currentUserID = req.session.currentUser._id;
  const dogs = await Dog.find({ userID: currentUserID });
  const lostDogs = [];
  const foundDogs = [];
  dogs.forEach(dog => {
    if (dog.status === 'lost') {
      lostDogs.push(dog);
    } else {
      foundDogs.push(dog);
    }
  });
  const dogsData = {
    dogs,
    lostDogs,
    foundDogs
  };
  res.render('dashboard', dogsData);
});

module.exports = router;
