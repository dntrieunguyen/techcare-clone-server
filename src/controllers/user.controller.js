const { createError } = require('../middlewares/errorHandler');
const db = require('../models');
const { STATUS_CODE } = require('../utils/constants');
const cloudinary = require('cloudinary').v2;
const getCurrentUser = async (req, res, next) => {};

const getAllUser = async (req, res, next) => {};

const uploadAvatar = async (req, res, next) => {
   try {
      console.log(req.file);
      if (!req.file)
         return next(
            createError(
               STATUS_CODE.BAD_REQUEST,
               'please choose a picture to upload',
            ),
         );

      const user = await db.User.findByPk(req.user.id);
      if (user.avatar) {
         const oldAvatarPath = user.avatar
            .match(/techcare\/avatars\/[^/]+/)[0]
            .replace(/\.[^/.]+$/, '');

         cloudinary.uploader.destroy(oldAvatarPath);
      }
      await db.User.update(
         { avatar: req.file.path },
         { where: { id: req.user.id } },
      );
      return res.status(STATUS_CODE.OK).json({
         success: true,
         message: 'upload avatar successfully',
      });
   } catch (error) {
      next(error);
   }
};

module.exports = { getAllUser, getCurrentUser, uploadAvatar };
