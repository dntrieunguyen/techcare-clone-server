const express = require('express');
const user = require('../controllers/user.controller');
const { verifyAccessToken } = require('../middlewares/jwt');
const uploadAvatar = require('../middlewares/uploadCloudAvatar');

const route = express.Router();

route.post(
   '/upload-avatar',
   [verifyAccessToken, uploadAvatar.single('avatar')],
   user.uploadAvatar,
);

module.exports = route;
