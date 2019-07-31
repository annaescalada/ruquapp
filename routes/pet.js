'use strict';

const express = require('express');
const router = express.Router();

const { isNotLoggedIn } = require('../middlewares/authMiddlewares');
const { isAddPetFormFilled, isEditPetFormFilled } = require('../middlewares/petMiddlewares');
const { match, deleteMatch } = require('../helpers/matchLogic');
const { sendContactMail } = require('../helpers/nodemailer');
const Dog = require('../models/Dog');
const Match = require('../models/Match');
const parser = require('../config/cloudinary');

var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
    let photo;
    if (req.file) {
      photo = req.file.secure_url;
    } else {
      photo = '/images/dog-default.png';
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
  try {
    const { dogID } = req.params;
    if (!ObjectId.isValid(dogID)) {
      next();
    }
    const dog = await Dog.findById(dogID);
    if (!dog) {
      next();
    }
    const status = dog.status;
    const idLostDog = mongoose.Types.ObjectId(dogID);
    const idFoundDog = mongoose.Types.ObjectId(dogID);
    let matchesCurrentDog = [];
    // let lost = false;
    // let found = false;

    if (status === 'lost') {
      matchesCurrentDog = await Match.find({ $or: [{ idLostDog }, { idFoundDog }] }).populate('idFoundDog');

      matchesCurrentDog.forEach(async (match) => {
        await Match.findByIdAndUpdate(match._id, { messageRead: true, new: false });
      });
      console.log(matchesCurrentDog);
      // matchesCurrentDog.forEach(match => {
      //   lost = true;
      //   match.lost = lost;
      // });
    } else {
      matchesCurrentDog = await Match.find({ $or: [{ idLostDog }, { idFoundDog }] }).populate({
        path: 'idLostDog',
        populate: {
          path: 'userID',
          model: 'User'
        }
      });
      console.log(matchesCurrentDog);
      // matchesCurrentDog.forEach(match => {
      //   found = true;
      //   match.found = found;
      // });
    }
    const data = {
      dog,
      matches: matchesCurrentDog
    };
    console.log(dog);
    res.render('matches', data);
  } catch (error) {
    next(error);
  }
});

router.get('/:dogID/edit', isNotLoggedIn, async (req, res, next) => {
  try {
    let dataEdit = {};
    const { dogID } = req.params;
    if (!ObjectId.isValid(dogID)) {
      next();
    }
    const dog = await Dog.findById(dogID);
    if (!dog) {
      next();
    }
    if (!dog) {
      return res.redirect('/404');
    }
    let status;
    if (dog.status === 'found') {
      status = dog.status;
    }
    dataEdit = {
      missingFields: req.flash('missingFieldsEdit'),
      id: dogID,
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
    // console.log(dataEdit);
    res.render('editPet', dataEdit);
  } catch (error) {
    next(error);
  }
});

router.post('/:dogID/edit', isNotLoggedIn, isEditPetFormFilled, async (req, res, next) => {
  try {
    const { dogID } = req.params;
    if (!ObjectId.isValid(dogID)) {
      next();
    }
    const dog = await Dog.findById(dogID);
    if (!dog) {
      next();
    }
    const { status, day, month, year, hour, location, name, white, grey, black, darkBrown, lightBrown, red, size, breed, ears, tail, hair } = req.body;
    const currentDogId = req.params.dogID;
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

    const newDog = await Dog.findByIdAndUpdate(currentDogId, {
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
  try {
    const { dogID } = req.params;
    if (!ObjectId.isValid(dogID)) {
      next();
    }
    const dog = await Dog.findById(dogID);
    if (!dog) {
      next();
    }
    if (dog.notification) {
      await Dog.findByIdAndUpdate(dogID, { notification: false });
    } else {
      await Dog.findByIdAndUpdate(dogID, { notification: true });
    }
    res.json({ message: 'Notification updated' });
  } catch (error) {
    next(error);
  }
});

router.post('/:dogID/delete', isNotLoggedIn, async (req, res, next) => {
  try {
    const { dogID } = req.params;
    if (!ObjectId.isValid(dogID)) {
      next();
    }
    const dog = await Dog.findById(dogID);
    if (!dog) {
      next();
    }
    await Dog.findByIdAndDelete(dogID);
    res.json({ message: 'Dog deleted' });
  } catch (error) {
    next(error);
  }
});

router.post('/matches/:matchID/delete', isNotLoggedIn, async (req, res, next) => {
  try {
    const { matchID } = req.params;
    if (!ObjectId.isValid(matchID)) {
      next();
    }
    const match = await Match.findById(matchID);
    if (!match) {
      next();
    }
    await Match.findByIdAndDelete(matchID);
    res.json({ message: 'Match deleted' });
  } catch (error) {
    next(error);
  }
});

router.post('/matches/:matchID/message', isNotLoggedIn, async (req, res, next) => {
  try {
    const { matchID } = req.params;
    if (!ObjectId.isValid(matchID)) {
      next();
    }
    const match = await Match.findById(matchID);
    if (!match) {
      next();
    }
    await Match.findById(matchID, { message: true, messageRead: false });
    await Match.findByIdAndDelete(matchID);
    await Match.findByIdAndUpdate(matchID, { message: true, messageRead: false });
    const matchInfo = await Match.findById(matchID).populate({
      path: 'idFoundDog',
      populate: {
        path: 'userID',
        model: 'User'
      }
    });
    const lostDogInfo = await Match.findById(matchID).populate('idLostDog');
    if (matchInfo.idFoundDog.notification) {
      sendContactMail(matchInfo.idFoundDog.userID.email, matchInfo.idFoundDog.userID.name, lostDogInfo.idLostDog.name);
    }
    res.json({ message: 'Owner contact info sent' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
