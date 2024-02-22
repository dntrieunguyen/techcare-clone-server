const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Cloudinary config
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
   api_key: process.env.CLOUDINARY_KEY,
   api_secret: process.env.CLOUDINARY_SECRET,
});
// define cloudinary storage source
const storageAvatar = new CloudinaryStorage({
   cloudinary,
   allowedFormats: ['jpg', 'png'],
   params: {
      folder: 'techcare/avatars',
   },
});
const storageBanner = new CloudinaryStorage({
   cloudinary,
   allowedFormats: ['jpg', 'png'],
   params: {
      folder: 'techcare/banners',
   },
});
const storageCarousel = new CloudinaryStorage({
   cloudinary,
   allowedFormats: ['jpg', 'png'],
   params: {
      folder: 'techcare/carousel',
   },
});
const storageModal = new CloudinaryStorage({
   cloudinary,
   allowedFormats: ['jpg', 'png'],
   params: {
      folder: 'techcare/modal',
   },
});

module.exports = {
   storageAvatar,
   storageBanner,
   storageCarousel,
   storageModal,
};
