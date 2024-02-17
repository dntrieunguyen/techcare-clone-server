const { STATUS_CODE } = require('../utils/constants');
const db = require('../models');
const service = require('../services/auth.service');
const { handleValidationErrors } = require('../utils/helpers');

const login = async (req, res, next) => {
   try {
      if (handleValidationErrors(req, res)) return;
      return res.status(STATUS_CODE.OK).json({
         success: true,
         message: 'successfully',
         results,
      });
   } catch (error) {
      next(error);
   }
};

const register = async (req, res, next) => {
   const { username, password, phone, email } = req.body;
   try {
      if (handleValidationErrors(req, res)) return;
      const response = await db.User.create({
         username,
         password,
         phone,
         email,
      });

      return res.status(STATUS_CODE.OK).json({
         success: true,
         message: 'Register successfully',
         results: response,
      });
   } catch (error) {
      next(error);
   }
};

module.exports = { login, register };
