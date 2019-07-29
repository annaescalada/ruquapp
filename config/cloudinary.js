const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'ruquapp',
  api_key: '148111121479213',
  api_secret: '7jtf219hI17T01Y-u-UynmQ_FsY'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'dogs',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

module.exports = parser;
