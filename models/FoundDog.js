'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const foundDogSchema = new Schema({
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
  color: {
    type: Object
  },
  size: {
    type: String
  },
  breed: {
    type: String
  },
  ears: {
    type: String
  },
  tail: {
    type: String
  },
  hair: {
    type: String
  },
  picture: {
    type: String
  },
  userID: {
    type: ObjectId,
    ref: 'User'
  },
  notification: {
    type: Boolean
  },
  status: {
    type: String
  }
}, {
  timestamps: true
});

const FoundDog = mongoose.model('FoundDog', foundDogSchema);

module.exports = FoundDog;
