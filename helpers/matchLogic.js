'use strict';

const Dog = require('../models/Dog');
const User = require('../models/User');
const Match = require('../models/Match');

async function match (dogID) {
  try {
    const currentDog = await Dog.findById(dogID);
    console.log(currentDog);
    let idLostDog;
    let idFoundDog;
    let dogs = [];
    let match = {};
    const currentDogColors = Object.keys(currentDog.color);
    const currentDogSize = Object.keys(currentDog.size);
    const currentDogHair = Object.keys(currentDog.hair);
    const currentDogTail = Object.keys(currentDog.tail);
    const currentDogEars = Object.keys(currentDog.ears);
    const commonAttributes = {};

    if (currentDog.status === 'lost') {
      idLostDog = dogID;
    } else {
      idFoundDog = dogID;
    }

    if (idLostDog) {
      dogs = await Dog.find(
        { status: 'found',
          $or: [
            { year: { $gt: currentDog.year } },
            { $and: [{ year: currentDog.year, month: { $gt: currentDog.month } }] },
            { $and: [{ year: currentDog.year, month: currentDog.month, day: { $gt: currentDog.day } }] },
            { $and: [{ year: currentDog.year, month: currentDog.month, day: currentDog.day, hour: { $gt: currentDog.hour } }] }
          ]
        });
    } else {
      dogs = await Dog.find(
        { status: 'lost',
          $or: [
            { year: { $lt: currentDog.year } },
            { $and: [{ year: currentDog.year, month: { $lt: currentDog.month } }] },
            { $and: [{ year: currentDog.year, month: currentDog.month, day: { $lt: currentDog.day } }] },
            { $and: [{ year: currentDog.year, month: currentDog.month, day: currentDog.day, hour: { $lt: currentDog.hour } }] }
          ]
        });
    }

    dogs.forEach(dog => {
      currentDogColors.forEach(currentColor => {
        if (Object.keys(dog.color).includes(currentColor)) {
          console.log(currentColor);
          commonAttributes.color = {};
          commonAttributes.color[currentColor] = currentColor;
        }
      });
      if (commonAttributes.color) {
        currentDogSize.forEach(currentSize => {
          if (Object.keys(dog.size).includes(currentSize)) {
            commonAttributes.size = {};
            commonAttributes.size[currentSize] = currentSize;
          }
        });
      }

      if (commonAttributes.color && commonAttributes.size) {
        match = {
          idLostDog,
          idFoundDog,
          compatibility: 60,
          new: true,
          message: false,
          messageRead: false
        };
        if (currentDog.breed === dog.breed) {
          match.compatibility += 10;
          commonAttributes.breed = dog.breed;
        }
        currentDogHair.forEach(currentHair => {
          if (Object.keys(dog.hair).includes(currentHair)) {
            commonAttributes.hair = {};
            commonAttributes.hair[currentHair] = currentHair;
          }
        });
        if (commonAttributes.hair) {
          match.compatibility += 10;
        }
        currentDogTail.forEach(currentTail => {
          if (Object.keys(dog.tail).includes(currentTail)) {
            commonAttributes.tail = {};
            commonAttributes.tail[currentTail] = currentTail;
          }
        });
        if (commonAttributes.tail) {
          match.compatibility += 10;
        }
        currentDogEars.forEach(currentEars => {
          if (Object.keys(dog.ears).includes(currentEars)) {
            commonAttributes.ears = {};
            commonAttributes.ears[currentEars] = currentEars;
          }
        });
        if (commonAttributes.ears) {
          match.compatibility += 10;
        }
        match.commonAttributes = commonAttributes;
        console.log(match);
        // create match in DB;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = match;

// const matchSchema = new Schema({
//   idLostDog: {
//     type: ObjectId,
//     ref: 'Dog',
//     required: true
//   },
//   idFoundDog: {
//     type: ObjectId,
//     ref: 'Dog',
//     required: true
//   },
//   commonAttributes: {
//     type: Object,
//     required: true
//   },
//   compatibility: {
//     type: Number,
//     required: true
//   },
//   new: {
//     type: Boolean,
//     required: true
//   },
//   message: {
//     type: Boolean,
//     required: true
//   },
//   messageRead: {
//     type: Boolean,
//     required: true
//   }
// }, {
//   timestamps: true
// });
