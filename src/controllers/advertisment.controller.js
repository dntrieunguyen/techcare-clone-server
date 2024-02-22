const { createError } = require('../middlewares/errorHandler');
const db = require('../models');
const { STATUS_CODE } = require('../utils/constants');
const cloudinary = require('cloudinary').v2;

const getAllAds = async (req, res, next) => {
   try {
      const results = await db.Advertisment.findAll();
      return res.status(STATUS_CODE.OK).json({
         success: true,
         message: 'successfully',
         results,
      });
   } catch (error) {
      next(error);
   }
};

const upload = async (req, res, next) => {
   try {
      if (req.files.length === 0)
         return next(
            createError(
               STATUS_CODE.BAD_REQUEST,
               'Please choose a picture to upload',
            ),
         );

      const ad_type = req.body.ad_type;

      const recentAds = await db.Advertisment.findAll({ where: { ad_type } });
      if (recentAds) {
         const oldAdsPath = recentAds.map(ad =>
            ad.image_url
               .match(new RegExp(`techcare/${ad_type}/[^/]+`))[0]
               .replace(/\.[^/.]+$/, ''),
         );
         await db.Advertisment.destroy({ where: { ad_type } });

         oldAdsPath.forEach(el => {
            cloudinary.uploader.destroy(el);
         });
      }

      req.files.forEach(async (el, index) => {
         await db.Advertisment.create({
            ad_type,
            image_url: el.path,
         });
      });

      return res.status(STATUS_CODE.OK).json({
         success: true,
         message: 'upload successfully',
      });
   } catch (error) {
      next(error);
   }
};

module.exports = {
   getAllAds,
   upload,
};
