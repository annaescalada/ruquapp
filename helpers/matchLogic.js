'use strict';

const Dog = require('../models/Dog');
const Match = require('../models/Match');

async function match (dogID) {
  try {
    const currentDog = await Dog.findById(dogID);
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

    let userIDMatch;

    await Promise.all(dogs.map(async dog => {
      if (idFoundDog === dogID) {
        idLostDog = dog._id;
        userIDMatch = dog.UserID;
      }
      if (idLostDog === dogID) {
        idFoundDog = dog._id;
        userIDMatch = dog.UserID;
      }

      // if (!currentDog.UserID === userIDMatch) {

      currentDogColors.forEach(currentColor => {
        if (Object.keys(dog.color).includes(currentColor)) {
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
          messageRead: true
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
        if (commonAttributes.hair && !currentDog.hair.unknown) {
          match.compatibility += 10;
        }
        currentDogTail.forEach(currentTail => {
          if (Object.keys(dog.tail).includes(currentTail)) {
            commonAttributes.tail = {};
            commonAttributes.tail[currentTail] = currentTail;
          }
        });
        if (commonAttributes.tail && !currentDog.tail.unknown) {
          match.compatibility += 10;
        }
        currentDogEars.forEach(currentEars => {
          if (Object.keys(dog.ears).includes(currentEars)) {
            commonAttributes.ears = {};
            commonAttributes.ears[currentEars] = currentEars;
          }
        });
        if (commonAttributes.ears && !currentDog.ears.unknown) {
          match.compatibility += 10;
        }
        match.commonAttributes = commonAttributes;
        await Match.create(match);
      }
      // }
    }));
  } catch (error) {
    console.error(error);
  }
}

async function deleteMatch (dogID) {
  const matches = await Match.find({ $or: [{ idLostDog: dogID, idFoundDog: dogID }] });
  matches.forEach(async match => {
    await Match.findByIdAndDelete(match._id);
  });
}

module.exports = {
  match,
  deleteMatch
};
