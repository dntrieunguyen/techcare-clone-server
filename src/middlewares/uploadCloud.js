const multer = require('multer');
const cloudinaryConfig = require('../config/cloudinary.config');

// define function
const uploadCloudAvatar = multer({ storage: cloudinaryConfig.storageAvatar });
const uploadCloudBanner = multer({ storage: cloudinaryConfig.storageBanner });
const uploadCloudCarousel = multer({
   storage: cloudinaryConfig.storageCarousel,
});
const uploadCloudModal = multer({ storage: cloudinaryConfig.storageModal });

module.exports = {
   uploadCloudAvatar,
   uploadCloudBanner,
   uploadCloudCarousel,
   uploadCloudModal,
};
