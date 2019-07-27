'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DogSchema = new Schema({
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
    enum: ['retriever', 'boxer', 'bulldog', 'beagle', 'rottweiler', 'chihuahua', 'collie', 'labrador', 'terrier', 'shepherd', 'dobermann', 'dalmata', 'default'],
    required: function () {
      return this.type === 'lost';
    },
    default: 'Mixed breed'
  },
  ears: {
    type: Object,
    required: function () {
      return this.type === 'lost';
    },
    default:
      {
        up: true,
        down: true
      }
  },
  tail: {
    type: Object,
    required: function () {
      return this.type === 'lost';
    },
    default:
      {
        longTail: true,
        longHairy: true,
        shortTail: true
      }
  },
  hair: {
    type: Object,
    required: function () {
      return this.type === 'lost';
    },
    default:
      {
        short: true,
        long: true
      }
  },
  photo: {
    type: String,
    default: '/images/dog-default.png'
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

const Dog = mongoose.model('LostDog', DogSchema);

module.exports = Dog;
