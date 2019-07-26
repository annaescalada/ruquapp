'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const matchSchema = new Schema({
  idLostDog: {
    type: ObjectId,
    ref: 'LostDog'
  },
  idFoundDog: {
    type: ObjectId,
    ref: 'FoundDog'
  },
  commonAttributes: {
    type: Object
  },
  compatibility: {
    type: Number
  },
  new: {
    type: Boolean
  },
  message: {
    type: Boolean
  },
  messageRead: {
    type: Boolean
  }
}, {
  timestamps: true
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
