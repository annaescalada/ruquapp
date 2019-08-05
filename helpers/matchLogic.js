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
      userIDMatch = dog.userID;
      if (idFoundDog === dogID) {
        idLostDog = dog._id;
      }
      if (idLostDog === dogID) {
        idFoundDog = dog._id;
      }

      let commonColor = false;
      let commonSize = false;
      let commonHair = false;
      let commonTail = false;
      let commonEars = false;

      if (JSON.stringify(currentDog.userID) !== JSON.stringify(userIDMatch)) {
        currentDogColors.forEach(currentColor => {
          commonAttributes.color = {};
          if (Object.keys(dog.color).includes(currentColor) && (currentColor !== 'unknown')) {
            commonAttributes.color[currentColor] = currentColor;
            commonColor = true;
          }
        });
        if (commonColor) {
          currentDogSize.forEach(currentSize => {
            if (Object.keys(dog.size).includes(currentSize) && (currentSize !== 'unknown')) {
              commonAttributes.size = {};
              commonAttributes.size[currentSize] = currentSize;
              commonSize = true;
            }
          });
        }

        if (commonColor && commonSize) {
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
            commonAttributes.hair = {};
            if (Object.keys(dog.hair).includes(currentHair) && (currentHair !== 'unknown') && (!dog.hair.unknown) && (!currentDog.hair.unknown)) {
              commonAttributes.hair[currentHair] = currentHair;
              commonHair = true;
            }
          });
          if (commonHair) {
            match.compatibility += 10;
          }
          commonAttributes.tail = {};
          currentDogTail.forEach(currentTail => {
            if (Object.keys(dog.tail).includes(currentTail) && (currentTail !== 'unknown') && (!dog.tail.unknown) && (!currentDog.tail.unknown)) {
              commonAttributes.tail[currentTail] = currentTail;
              commonTail = true;
            }
          });
          if (commonTail) {
            match.compatibility += 10;
          }
          commonAttributes.ears = {};
          currentDogEars.forEach(currentEars => {
            if (Object.keys(dog.ears).includes(currentEars) && (currentEars !== 'unknown') && (!dog.ears.unknown) && (!currentDog.ears.unknown)) {
              commonAttributes.ears[currentEars] = currentEars;
              commonEars = true;
            }
          });
          if (commonEars) {
            match.compatibility += 10;
          }
          match.commonAttributes = commonAttributes;
          await Match.create(match);
        }
      }
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
