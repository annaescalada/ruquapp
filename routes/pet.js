'use strict';

const express = require('express');
const router = express.Router();

const { isNotLoggedIn } = require('../middlewares/authMiddlewares');
const { isAddPetFormFilled, isEditPetFormFilled } = require('../middlewares/petMiddlewares');
const { match, deleteMatch } = require('../helpers/matchLogic');
const Dog = require('../models/Dog');
const Match = require('../models/Match');
const parser = require('../config/cloudinary');

var mongoose = require('mongoose');

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

router.post('/add', parser.single('photo'), isNotLoggedIn, isAddPetFormFilled, async (req, res, next) => {
  try {
    const { status, day, month, year, hour, location, name, white, grey, black, darkBrown, lightBrown, red, size, breed, ears, tail, hair } = req.body;

    // Código Axel
    // for (const key in req.body) {
    //   createFlashMessage({ [key]: req.body[key] });
    // }
    // function createFlashMessage (data) {
    //   req.flash('dataFrom', data);
    // }

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

    const newDog = await Dog.create({
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

    match(newDog._id);

    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
});

router.get('/:dogID/matches', isNotLoggedIn, async (req, res, next) => {
  const { dogID } = req.params;
  console.log(dogID);
  const dog = await Dog.findById(dogID);
  const status = dog.status;
  const idLostDog = mongoose.Types.ObjectId(dogID);
  const idFoundDog = mongoose.Types.ObjectId(dogID);
  console.log(idLostDog, idFoundDog);
  const matchesCurrentDog = await Match.find({ $or: [{ idLostDog }, { idFoundDog }] }).populate('idLostDog').populate('idFoundDog');
  console.log(matchesCurrentDog);
  const data = {
    status,
    dog,
    matches: matchesCurrentDog
  };
  res.render('matches', data);
});

router.get('/:dogID/edit', isNotLoggedIn, async (req, res, next) => {
  const { dogID } = req.params;
  const dog = await Dog.findById(dogID);
  let status;
  if (dog.status === 'found') {
    status = dog.status;
  }
  console.log(dog);
  const dataEdit = {
    missingFields: req.flash('missingFieldsEdit'),
    status,
    day: dog.day,
    month: dog.month,
    year: dog.year,
    hour: dog.hour,
    location: dog.location,
    name: dog.name,
    colorUnknown: dog.color.unknown,
    sizeUnknown: dog.size.unknown,
    earsUnknown: dog.ears.unknown,
    tailUnknown: dog.tail.unknown,
    hairUnknown: dog.hair.unknown,
    white: dog.color.white,
    grey: dog.color.grey,
    black: dog.color.black,
    darkBrown: dog.color.darkBrown,
    lightBrown: dog.color.lightBrown,
    red: dog.color.red,
    small: dog.size.small,
    medium: dog.size.medium,
    large: dog.size.large,
    breed: dog.breed,
    up: dog.ears.up,
    down: dog.ears.down,
    longTail: dog.tail.longTail,
    longHairy: dog.tail.longHairy,
    shortTail: dog.tail.shortTail,
    long: dog.hair.long,
    short: dog.hair.short
  };
  console.log(dataEdit);
  res.render('editPet', dataEdit);
});

router.post('/edit', isNotLoggedIn, isEditPetFormFilled, async (req, res, next) => {
  try {
    const { status, day, month, year, hour, location, name, white, grey, black, darkBrown, lightBrown, red, size, breed, ears, tail, hair } = req.body;

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

    const newDog = await Dog.create({
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
      hair: hairObj
    });

    await deleteMatch(newDog._id);
    await match(newDog._id);

    res.redirect('/dashboard');
  } catch (error) {
    next(error);
  }
});

router.post('/:dogID/notification', isNotLoggedIn, async (req, res, next) => {
  const { dogID } = req.params;
  const dog = await Dog.findById(dogID);
  if (dog.notification) {
    await Dog.findByIdAndUpdate(dogID, { notification: false });
  } else {
    await Dog.findByIdAndUpdate(dogID, { notification: true });
  }
  res.json({ message: 'Notification updated' });
});

router.post('/:dogID/delete', isNotLoggedIn, async (req, res, next) => {
  const { dogID } = req.params;
  await Dog.findByIdAndDelete(dogID);
  res.json({ message: 'Dog deleted' });
});

module.exports = router;
