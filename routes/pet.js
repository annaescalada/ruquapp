'use strict';

const express = require('express');
const router = express.Router();

const { isNotLoggedIn } = require('../middlewares/authMiddlewares');
// const { isAddLostPetFormFilled, isAddFoundPetFormFilled } = require('../middlewares/petMiddlewares');
const Dog = require('../models/Dog');
const parser = require('../config/cloudinary');

router.get('/:dogID/matches', isNotLoggedIn, (req, res, next) => {
  res.render('matches');
});

router.get('/add', isNotLoggedIn, (req, res, next) => {
  const data = {
    missingFields: req.flash('missingFields')
  };
  res.render('addPet', data);
});

router.post('/add', isNotLoggedIn, parser.single('photo'), async (req, res, next) => {
  try {
    const { status, day, month, year, hour, location, name, white, grey, black, darkBrown, lightBrown, red, size, breed, ears, tail, hair } = req.body;
    if (status === 'lost') {
      if (!status || !day || !month || !year || !hour || !location || !name || !size || !breed || !ears || !tail || !hair || (!white && !grey && !black && !darkBrown && !lightBrown && !red)) {
        req.flash('missingFields', 'All fields are required');
        return res.redirect('/pet/add');
      }
    } else {
      if (!status || !day || !month || !year || !hour || !location) {
        req.flash('missingFields', 'Location, date and hour fields are required');
        return res.redirect('/pet/add');
      }
    }

    let { photo } = req.body;
    const sizeObj = {};
    const tailObj = {};
    const earsObj = {};
    const hairObj = {};
    let colorObj = {
      white,
      grey,
      black,
      darkBrown,
      lightBrown,
      red,
      unknown: false
    };

    switch (size) {
    case 'large':
      sizeObj.large = true;
      break;
    case 'medium':
      sizeObj.medium = true;
      break;
    case 'small':
      sizeObj.small = true;
      break;
    default:
      sizeObj.small = true;
      sizeObj.medium = true;
      sizeObj.large = true;
      sizeObj.unknown = true;
    }

    switch (tail) {
    case 'longTail':
      tailObj.longTail = true;
      break;
    case 'longHairy':
      tailObj.longHairy = true;
      break;
    case 'shortTail':
      tailObj.shortTail = true;
      break;
    default:
      tailObj.longTail = true;
      tailObj.longHairy = true;
      tailObj.shortTail = true;
      tailObj.unknown = true;
    }

    switch (ears) {
    case 'up':
      earsObj.up = true;
      break;
    case 'down':
      earsObj.down = true;
      break;
    default:
      earsObj.up = true;
      earsObj.down = true;
      earsObj.unknown = true;
    }

    switch (hair) {
    case 'short':
      hairObj.short = true;
      break;
    case 'long':
      hairObj.long = true;
      break;
    default:
      hairObj.short = true;
      hairObj.long = true;
      hairObj.unknown = true;
    }

    if (!white && !grey && !black && !darkBrown && !lightBrown && !red) {
      colorObj = {
        white: 'white',
        grey: 'grey',
        black: 'black',
        darkBrown: 'darkBrown',
        lightBrown: 'lightBrown',
        red: 'red',
        unknown: true
      };
    }

    const photoUrl = req.secure_url;

    if (!photo) {
      photo = '/images/dog-default.png';
    } else {
      photo = photoUrl;
    }

    await Dog.create({
      notification: true,
      userID: req.session.currentUser._id,
      status,
      day,
      month,
      year,
      hour,
      location,
      name,
      color: colorObj,
      size: sizeObj,
      breed,
      ears: earsObj,
      tail: tailObj,
      hair: hairObj,
      photo
    });
    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
