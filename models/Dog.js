'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const lostDogSchema = new Schema({
  status: {
    type: String,
    enum: ['lost', 'found'],
    required: true
  },
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
    required: function () {
      return this.type === 'lost';
    },
    default: 'Ruqu'
  },
  color: {
    type: Object,
    required: function () {
      return this.type === 'lost';
    },
    default:
      {
        white: true,
        black: true,
        darkBrown: true,
        lightBrown: true,
        red: true,
        grey: true
      }
  },
  size: {
    type: Object,
    required: function () {
      return this.type === 'lost';
    },
    default:
      {
        small: true,
        medium: true,
        big: true
      }
  },
  breed: {
    type: String,
    enum: ['Golden Retriever', 'Boxer', 'Bulldog', 'Beagle', 'Rottweilers', 'Chihuahua', 'Border Collie', 'Labrador', 'Border Terrier', 'German Shepherd', 'Dobermann', 'Dalmata', 'Mixed breed'],
    required: function () {
      return this.type === 'lost';
    },
    default:'Mixed breed';
  },
  ears: {
    type: String,
    required: function () {
      return this.type === 'lost';
    },
    default:
      {
        up: true,
        down: true,
      } 
    },
  tail: {
    type: String,
    required: function () {
      return this.type === 'lost';
    },
    default:
      {
        long: true,
        longHairy: true,
        short: true
      } 
  },
  hair: {
    type: String,
    required: function () {
      return this.type === 'lost';
    },
    default:
      {
        short: true,
        long: true,
      } 
    },
  picture: {
    type: String,
    default: ''
  },
  userID: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  notification: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: true
});

const LostDog = mongoose.model('LostDog', lostDogSchema);

module.exports = LostDog;