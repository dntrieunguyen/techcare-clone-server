const jwt = require('jsonwebtoken');
const { ROLE, STATUS_CODE } = require('../utils/constants');
const { createError } = require('./errorHandler');
require('dotenv').config();

const generateAccessToken = (id, role) =>
   jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: '3d' });

const generateRefreshToken = id =>
   jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '30d' });

const verifyAccessToken = (req, res, next) => {
   // get token from client
   const token = req.session.accessToken;
   // verify token
   jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err)
         next(createError(STATUS_CODE.UNAUTHORIZED, 'You have to login first'));
      // save decode to verify role
      return (req.user = decode);
   });
   return next();
};
const verifyAdmin = (req, res, next) => {
   const { role } = req.user;
   if (role !== ROLE.ADMIN)
      next(createError(STATUS_CODE.UNAUTHORIZED, 'Your are not admin'));
   return next();
};
const verifySupporter = (req, res, next) => {};

module.exports = {
   generateAccessToken,
   generateRefreshToken,
   verifyAdmin,
   verifySupporter,
   verifyAccessToken,
};
