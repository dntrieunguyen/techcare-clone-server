const { validationResult } = require('express-validator');
const { STATUS_CODE } = require('../utils/constants');

const login = async (req, res, next) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         let message = [];
         errors.array().forEach(e => message.push(e.msg));
         return res.status(422).json({ errors: message.join('\n') });
      }
      return res.status(STATUS_CODE.OK).json({
         success: true,
         message: 'successfully',
      });
   } catch (error) {
      next(error);
   }
};

const register = async (req, res, next) => {
   try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         let message = [];
         errors.array().forEach(e => message.push(e.msg));
         return res.status(422).json({ errors: message.join('\n') });
      }
      return res.status(STATUS_CODE.OK).json({
         success: true,
         message: 'successfully',
      });
   } catch (error) {
      next(error);
   }
};

module.exports = { login, register };
