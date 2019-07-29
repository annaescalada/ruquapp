'use strict';

const mongoose = require('mongoose');

// setup mongoose
mongoose.connect('mongodb://localhost/ruquDB', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const User = require('../models/User.js');
const Dog = require('../models/Dog');

async function seedsDogs () {
  const users = await User.find();

  const seeds = [

    {
      name: 'Rufus',
      color: {
        white: true,
        black: true,
        red: true,
        unknown: false
      },
      size: {
        medium: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longTail: true
      },
      hair: {
        short: true
      },
      photo: '/images/seeds/seeds1.jpeg',
      notification: true,
      userID: users[0],
      status: 'lost',
      day: 1,
      month: 3,
      year: 2019,
      hour: 10,
      location: 'C/joan gamper 25'
    },
    {
      name: 'Zuki',
      color: {
        white: true,
        lightBrown: true,
        unknown: false
      },
      size: {
        large: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longHairy: true
      },
      hair: {
        long: true
      },
      photo: '/images/seeds2.jpeg',
      notification: true,
      userID: users[0],
      status: 'lost',
      day: 13,
      month: 4,
      year: 2019,
      hour: 20,
      location: 'C/padilla 120'
    },
    {
      name: 'Nala',
      color: {
        black: true,
        red: true
      },
      size: {
        large: true
      },
      breed: 'Rottweiler',
      ears: {
        down: true
      },
      tail: {
        shortTail: true
      },
      hair: {
        short: true
      },
      photo: '/images/seeds3.jpeg',
      notification: true,
      userID: users[0],
      status: 'lost',
      day: 30,
      month: 6,
      year: 2019,
      hour: 8,
      location: 'Plaza de sants 4'
    },
    {
      name: 'Dark',
      color: {
        darkBrown: true
      },
      size: {
        big: true
      },
      breed: 'Labador',
      ears: {
        down: true
      },
      tail: {
        shortTail: true
      },
      hair: {
        short: true
      },
      photo: '/images/seeds4.jpeg',
      notification: true,
      userID: users[0],
      status: 'lost',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Balmes 6'
    },
    {
      name: 'Pichu',
      color: {
        grey: true
      },
      size: {
        small: true
      },
      breed: 'Chihuahua',
      ears: {
        down: true
      },
      tail: {
        shortTail: true
      },
      hair: {
        short: true
      },
      photo: '/images/seeds5.jpeg',
      notification: true,
      userID: users[0],
      status: 'lost',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Palamos 162'
    },
    {
      color: {
        lightBrown: true
      },
      size: {
        big: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longHairy: true
      },
      hair: {
        long: true
      },
      photo: '/images/seeds6.jpeg',
      notification: true,
      userID: users[0],
      status: 'lost',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Aribau 114'
    },

    {
      color: {
        grey: true,
        white: true
      },
      size: {
        big: true,
        medium: true,
        large: true,
        unknown: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longTail: true
      },
      hair: {
        long: true
      },
      photo: '/images/dog-default.jpeg',
      notification: true,
      userID: users[0],
      status: 'found',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Villarroel 22'
    },
    {
      color: {
        white: 'white',
        grey: 'grey',
        black: 'black',
        darkBrown: 'darkBrown',
        lightBrown: 'lightBrown',
        red: 'red',
        unknown: true
      },
      size: {
        medium: true
      },
      breed: 'Mixed breed',
      ears: {
        up: true
      },
      tail: {
        shortTail: true
      },
      hair: {
        short: true
      },
      photo: '/images/dog-default.jpeg',
      notification: true,
      userID: users[0],
      status: 'found',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Numancia 2'
    },
    {
      color: {
        black: true
      },
      size: {
        big: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longHairy: true
      },
      hair: {
        long: true
      },
      photo: '/images/seeds.jpeg',
      notification: true,
      userID: users[0],
      status: 'found',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Villarroel 22'
    },
    {
      color: {
        lightBrown: true
      },
      size: {
        big: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longHairy: true
      },
      hair: {
        long: true
      },
      photo: '/images/seeds.jpeg',
      notification: true,
      userID: users[0],
      status: 'found',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Villarroel 22'
    },
    {
      color: {
        lightBrown: true
      },
      size: {
        big: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longHairy: true
      },
      hair: {
        long: true
      },
      photo: '/images/seeds.jpeg',
      notification: true,
      userID: users[0],
      status: 'found',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Villarroel 22'
    },
    {
      color: {
        lightBrown: true
      },
      size: {
        big: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longHairy: true
      },
      hair: {
        long: true
      },
      photo: '/images/seeds.jpeg',
      notification: true,
      userID: users[0],
      status: 'found',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Villarroel 22'
    },
    {
      color: {
        lightBrown: true
      },
      size: {
        big: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longHairy: true
      },
      hair: {
        long: true
      },
      photo: '/images/seeds.jpeg',
      notification: true,
      userID: users[0],
      status: 'found',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Villarroel 22'
    },
    {
      color: {
        lightBrown: true
      },
      size: {
        big: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longHairy: true
      },
      hair: {
        long: true
      },
      photo: '/images/seeds.jpeg',
      notification: true,
      userID: users[0],
      status: 'found',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Villarroel 22'
    },
    {
      color: {
        lightBrown: true
      },
      size: {
        big: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longHairy: true
      },
      hair: {
        long: true
      },
      photo: '/images/seeds.jpeg',
      notification: true,
      userID: users[0],
      status: 'found',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Villarroel 22'
    },
    {
      color: {
        lightBrown: true
      },
      size: {
        big: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longHairy: true
      },
      hair: {
        long: true
      },
      photo: '/images/seeds.jpeg',
      notification: true,
      userID: users[0],
      status: 'found',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Villarroel 22'
    },
    {
      color: {
        lightBrown: true
      },
      size: {
        big: true
      },
      breed: 'Mixed breed',
      ears: {
        down: true
      },
      tail: {
        longHairy: true
      },
      hair: {
        long: true
      },
      photo: '/images/seeds.jpeg',
      notification: true,
      userID: users[0],
      status: 'found',
      day: 22,
      month: 5,
      year: 2019,
      hour: 18,
      location: 'C/Villarroel 22'
    },
    v

  ];
}

User.create(seeds).then((users) => {
  console.log(users);
  mongoose.connection.close();
}).catch((error) => {
  console.log(error);
});
