const express = require('express');
const ads = require('../controllers/advertisment.controller');
const { verifyAccessToken, verifyAdmin } = require('../middlewares/jwt');
const {
   uploadCloudBanner,
   uploadCloudCarousel,
   uploadCloudModal,
} = require('../middlewares/uploadCloud');

const route = express.Router();

route.get('/', ads.getAllAds);

route.post(
   '/upload-banner',
   [verifyAccessToken, verifyAdmin],
   uploadCloudBanner.array('banner', 10),
   ads.upload,
);
route.post(
   '/upload-carousel',
   [verifyAccessToken, verifyAdmin],
   uploadCloudCarousel.array('carousel', 10),
   ads.upload,
);
route.post(
   '/upload-modal',
   [verifyAccessToken, verifyAdmin],
   uploadCloudModal.array('modal', 10),
   ads.upload,
);

module.exports = route;
