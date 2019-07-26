'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const matchSchema = new Schema({
  idLostDog: {
    type: ObjectId,
    ref: 'Dog',
    required: true
  },
  idFoundDog: {
    type: ObjectId,
    ref: 'Dog',
    required: true
  },
  commonAttributes: {
    type: Object,
    required: true
  },
  compatibility: {
    type: Number,
    required: true
  },
  new: {
    type: Boolean,
    required: true
  },
  message: {
    type: Boolean,
    required: true
  },
  messageRead: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;
