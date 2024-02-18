const { validationResult } = require('express-validator');
const { STATUS_CODE } = require('./constants');

const handleValidationErrors = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      let message = [];
      errors.array().forEach(e => message.push(e.msg));
      return res.status(STATUS_CODE.BAD_REQUEST).json({
         success: false,
         message: message.join('\n'),
      });
   }
   return;
};

module.exports = { handleValidationErrors };
