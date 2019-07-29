'use strict';

const mongoose = require('mongoose');

// setup mongoose
mongoose.connect('mongodb://localhost/ruquDB', {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
});

const User = require('../models/User.js');

const seeds = [

  {
    name: 'Marcela',
    surname: 'Ramírez',
    phone: '634 832 721',
    email: 'marce@mail.com',
    password: '$2b$10$mcPy3Qtj58w1q0dtQ8DJse0J3RKrMLx0eXCsLHHEEScTogvutdkFS'
  },
  {
    name: 'Gloria',
    surname: 'Visús',
    phone: '634 832 721',
    email: 'gloria@mail.com',
    password: '$2b$10$mcPy3Qtj58w1q0dtQ8DJse0J3RKrMLx0eXCsLHHEEScTogvutdkFS'
  },
  {
    name: 'Anna',
    surname: 'Condal',
    phone: '634 832 721',
    email: 'annac@mail.com',
    password: '$2b$10$mcPy3Qtj58w1q0dtQ8DJse0J3RKrMLx0eXCsLHHEEScTogvutdkFS'
  },
  {
    name: 'Marc',
    surname: 'Barrera',
    phone: '634 832 721',
    email: 'marc@mail.com',
    password: '$2b$10$mcPy3Qtj58w1q0dtQ8DJse0J3RKrMLx0eXCsLHHEEScTogvutdkFS'
  },
  {
    name: 'Edgar',
    surname: 'Castrillo',
    phone: '634 832 721',
    email: 'edgar@mail.com',
    password: '$2b$10$mcPy3Qtj58w1q0dtQ8DJse0J3RKrMLx0eXCsLHHEEScTogvutdkFS'
  },
  {
    name: 'Jack',
    surname: 'Watkins',
    phone: '634 832 721',
    email: 'jackito@mail.com',
    password: '$2b$10$mcPy3Qtj58w1q0dtQ8DJse0J3RKrMLx0eXCsLHHEEScTogvutdkFS'
  },
  {
    name: 'Anna',
    surname: 'Escalada',
    phone: '634 832 721',
    email: 'anna@mail.com',
    password: '$2b$10$mcPy3Qtj58w1q0dtQ8DJse0J3RKrMLx0eXCsLHHEEScTogvutdkFS'
  },
  {
    name: 'Esther',
    surname: 'Bernal',
    phone: '634 832 721',
    email: 'esther@mail.com',
    password: '$2b$10$mcPy3Qtj58w1q0dtQ8DJse0J3RKrMLx0eXCsLHHEEScTogvutdkFS'
  }

];

User.create(seeds).then((users) => {
  console.log(users);
  mongoose.connection.close();
}).catch((error) => {
  console.log(error);
});
