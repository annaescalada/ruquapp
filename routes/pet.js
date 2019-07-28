'use strict';

const express = require('express');
const router = express.Router();

const { isNotLoggedIn } = require('../middlewares/authMiddlewares');
// const { isAddLostPetFormFilled, isAddFoundPetFormFilled } = require('../middlewares/petMiddlewares');
const Dog = require('../models/Dog');
const parser = require('../config/cloudinary');

router.get('/add', isNotLoggedIn, (req, res, next) => {
  const data = {
    missingFields: req.flash('missingFields'),
    status: req.flash('statusRecoverAdd'),
    day: req.flash('dayRecoverAdd'),
    month: req.flash('monthRecoverAdd'),
    year: req.flash('yearRecoverAdd'),
    hour: req.flash('hourRecoverAdd'),
    location: req.flash('locationRecoverAdd'),
    name: req.flash('nameRecoverAdd'),
    white: req.flash('whiteRecoverAdd'),
    grey: req.flash('greyRecoverAdd'),
    black: req.flash('blackRecoverAdd'),
    darkBrown: req.flash('darkBrownRecoverAdd'),
    lightBrown: req.flash('lightBrownRecoverAdd'),
    red: req.flash('redRecoverAdd'),
    small: req.flash('smallRecoverAdd'),
    medium: req.flash('mediumRecoverAdd'),
    large: req.flash('largeRecoverAdd'),
    breed: req.flash('breedRecoverAdd'),
    up: req.flash('upRecoverAdd'),
    down: req.flash('downRecoverAdd'),
    longTail: req.flash('longTailRecoverAdd'),
    longHairy: req.flash('longHairyRecoverAdd'),
    shortTail: req.flash('shortTailRecoverAdd'),
    long: req.flash('longRecoverAdd'),
    short: req.flash('shortRecoverAdd')
  };
  res.render('addPet', data);
});

router.post('/add', isNotLoggedIn, parser.single('photo'), async (req, res, next) => {
  try {
    const { status, day, month, year, hour, location, name, white, grey, black, darkBrown, lightBrown, red, size, breed, ears, tail, hair } = req.body;

    if (status === 'found') {
      req.flash('statusRecoverAdd', status);
    }
    if (day) {
      req.flash('dayRecoverAdd', day);
    }
    if (month) {
      req.flash('monthRecoverAdd', month);
    }
    if (year) {
      req.flash('yearRecoverAdd', year);
    }
    if (hour) {
      req.flash('hourRecoverAdd', hour);
    }
    if (location) {
      req.flash('locationRecoverAdd', location);
    }
    if (name) {
      req.flash('nameRecoverAdd', name);
    }
    if (white) {
      req.flash('whiteRecoverAdd', white);
    }
    if (grey) {
      req.flash('greyRecoverAdd', grey);
    }
    if (black) {
      req.flash('blackRecoverAdd', black);
    }
    if (darkBrown) {
      req.flash('darkBrownRecoverAdd', darkBrown);
    }
    if (lightBrown) {
      req.flash('lightBrownRecoverAdd', lightBrown);
    }
    if (red) {
      req.flash('redRecoverAdd', red);
    }
    if (size === 'small') {
      req.flash('smallRecoverAdd', size);
    } else if (size === 'medium') {
      req.flash('mediumRecoverAdd', size);
    } else if (size === 'large') {
      req.flash('largeRecoverAdd', size);
    }
    if (breed) {
      req.flash('breedRecoverAdd', breed);
    }
    if (ears === 'up') {
      req.flash('upRecoverAdd', ears);
    } else if (ears === 'down') {
      req.flash('downRecoverAdd', ears);
    }
    if (tail === 'longTail') {
      req.flash('longTailRecoverAdd', tail);
    } else if (tail === 'longHairy') {
      req.flash('longHairyRecoverAdd', tail);
    } else if (tail === 'shortTail') {
      req.flash('shortTailRecoverAdd', tail);
    }
    if (hair === 'long') {
      req.flash('longRecoverAdd', hair);
    } else if (hair === 'short') {
      req.flash('shortRecoverAdd', hair);
    }

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

router.get('/:dogID/matches', isNotLoggedIn, async (req, res, next) => {
  const { dogID } = req.params;
  const dog = await Dog.findById(dogID);
  console.log(dog);
  res.render('matches', dog);
});

module.exports = router;
