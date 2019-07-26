'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const lostDogSchema = new Schema({
  day: {
    type: Number,
    required: true
  },
  month: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  hour: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: Object,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  ears: {
    type: String,
    required: true
  },
  tail: {
    type: String,
    required: true
  },
  hair: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  userID: {
    type: ObjectId,
    ref: 'User'
  },
  notification: {
    type: Boolean,
    required: true
  },
  status: {
    type: String
  }
}, {
  timestamps: true
});

const LostDog = mongoose.model('LostDog', lostDogSchema);

module.exports = LostDog;
