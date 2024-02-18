const { STATUS_CODE } = require('../utils/constants');

const getAllAds = async (req, res, next) => {
   try {
      return res.status(STATUS_CODE.OK).json({
         success: true,
         message: 'successfully',
      });
   } catch (error) {
      next(error);
   }
};

module.exports = {
   getAllAds,
};
