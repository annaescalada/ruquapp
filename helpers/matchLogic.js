'use strict';

const Dog = require('../models/Dog');
const User = require('../models/User');
const Match = require('../models/Match');

async function match (dogID) {
  const currentDog = await Dog.findById(dogID);
  console.log(currentDog);
  let idLostDog;
  let idFoundDog;
  let dogs = [];

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
          { $and: [{ year: currentDog.year, month: { gt: currentDog.month } }] },
          { $and: [{ ear: currentDog.year, month: currentDog.month, day: { gt: currentDog.day } }] },
          { $and: [{ ear: currentDog.year, month: currentDog.month, day: currentDog.day, hour: { $gt: currentDog.hour } }] }
        ]
      });
  } else {
    dogs = await Dog.find(
      { status: 'lost',
        $or: [
          { year: { $lt: currentDog.year } },
          { $and: [{ year: currentDog.year, month: { lt: currentDog.month } }] },
          { $and: [{ ear: currentDog.year, month: currentDog.month, day: { lt: currentDog.day } }] },
          { $and: [{ ear: currentDog.year, month: currentDog.month, day: currentDog.day, hour: { $lt: currentDog.hour } }] }
        ]
      });
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
