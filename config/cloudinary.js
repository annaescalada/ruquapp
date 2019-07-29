const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
<<<<<<< HEAD

cloudinary.config({
  cloud_name: 'ruquapp',
  api_key: '148111121479213',
  api_secret: '7jtf219hI17T01Y-u-UynmQ_FsY'
=======
require('dotenv').config();

cloudinary.config({
  cloud_name: 'ruquapp',
  api_key: process.env.CLOUDINARY,
  api_secret: process.env.CLOUDINARY_SECRET
>>>>>>> 48ec02f51e86da3df2a24fa12a00b4c6d3c0a082
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'dogs',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

module.exports = parser;
