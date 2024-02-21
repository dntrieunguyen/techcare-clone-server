const express = require('express');
const user = require('../controllers/user.controller');
const { verifyAccessToken } = require('../middlewares/jwt');
const uploadCloud = require('../middlewares/uploadCloud.js');

const route = express.Router();

route.post(
   '/upload-avatar',
   [verifyAccessToken],
   uploadCloud.uploadCloudAvatar.single('avatar'),
   user.uploadAvatar,
);

module.exports = route;
