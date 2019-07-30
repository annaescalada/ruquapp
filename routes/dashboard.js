'use strict';

const express = require('express');
const router = express.Router();

const Dog = require('../models/Dog.js');
const Match = require('../models/Match.js');

const { isNotLoggedIn } = require('../middlewares/authMiddlewares');

/* GET home page. */
router.get('/', isNotLoggedIn, async (req, res, next) => {
  const currentUserID = req.session.currentUser._id;
  const dogs = await Dog.find({ userID: currentUserID });
  const lostDogs = [];
  const foundDogs = [];
  let dogsData;

  dogs.forEach(async dog => {
    const matches = await Match.find({ $or: [{ idFoundDog: dog._id }, { idLostDog: dog._id }] });

    const totalMatches = matches.length;
    let newMacthes = false;
    let totalMessages = 0;
    let newMessages = false;

    matches.forEach(match => {
      if (match.new) {
        newMacthes = true;
      }
      if (match.message) {
        totalMessages++;
        if (!match.messageRead) {
          newMessages = true;
        }
      }
    });

    dog.totalMatches = totalMatches;
    dog.newMacthes = newMacthes;
    dog.totalMessages = totalMessages;
    dog.newMessages = newMessages;

    if (dog.status === 'lost') {
      lostDogs.push(dog);
    } else {
      foundDogs.push(dog);
    }
  });
  dogsData = {
    dogs,
    lostDogs,
    foundDogs
  };
  res.render('dashboard', dogsData);
});

module.exports = router;
