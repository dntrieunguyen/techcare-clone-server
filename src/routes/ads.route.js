const express = require('express');
const ads = require('../controllers/ads.controller');
const { verifyAccessToken, verifyAdmin } = require('../middlewares/jwt');

const route = express.Router();

route.get('/', [verifyAccessToken, verifyAdmin], ads.getAllAds);

module.exports = route;
