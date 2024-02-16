const { STATUS_CODE } = require('../utils/constants.js');

const notFound = (req, res, next) => {
   const error = new Error(`Route ${req.originalUrl} not found!`);
   return res.status(404).json({
      success: false,
      message: error.message,
   });
};

const errHandler = (err, req, res, next) => {
   const statusCode = err?.status || STATUS_CODE.INTERFACE_SERVER_ERROR;
   const message = err?.message;
   return res.status(statusCode).json({
      success: false,
      message,
   });
};

const createError = (status, message) => {
   const err = new Error();
   err.status = status;
   err.message = message;
   return err;
};

module.exports = {
   notFound,
   errHandler,
   createError,
};
