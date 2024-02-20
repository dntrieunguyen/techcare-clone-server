const { STATUS_CODE } = require('../utils/constants');
const db = require('../models');

const { handleValidationErrors } = require('../utils/helpers');
const {
   generateAccessToken,
   generateRefreshToken,
} = require('../middlewares/jwt');

const login = async (req, res, next) => {
   try {
      // Validation error
      if (handleValidationErrors(req, res)) return;
      // user authenticated
      const response = await db.User.findOne({
         where: { username: req.body.username },
      });
      // generate accessToken and refreshToken
      const accessToken = generateAccessToken(response.id, response.role);
      const refreshToken = generateRefreshToken(response.id);
      // store accessToken and refreshToken in client
      req.session.accessToken = accessToken;

      // update refreshToken to db
      await db.User.update(
         { refreshToken },
         {
            where: { id: response.id },
         },
      );

      return res.status(STATUS_CODE.OK).json({
         success: true,
         message: 'successfully',
         accessToken,
         results: response,
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

const logout = async (req, res, next) => {
   req.session.destroy();

   return res.status(STATUS_CODE.OK).json({
      success: true,
      message: 'Logout successfully',
   });
};

module.exports = { login, register, logout };
