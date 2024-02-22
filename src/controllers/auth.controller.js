const { STATUS_CODE } = require('../utils/constants');
const db = require('../models');
require('dotenv').config();

const { handleValidationErrors } = require('../utils/helpers');
const {
   generateAccessToken,
   generateRefreshToken,
   generateForgotPasswordToken,
} = require('../middlewares/jwt');
const { createError } = require('../middlewares/errorHandler');
const { sendMail } = require('../utils/sendMail');

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

const forgotPassword = async (req, res, next) => {
   try {
      const user = await db.User.findOne({
         where: { email: req.body.email },
      });

      if (!user) throw new Error('User not found');
      const token = generateForgotPasswordToken({ id: user.id });
      await db.User.update(
         {
            passwordResetToken: token,
            passwordResetExpires: Date.now() + 15 * 60 * 1000, // hour * minute * second * milisecond
         },
         {
            where: { id: user.id },
         },
      );
      req.session.passwordResetToken = token;
      const html = `Vui lòng nhấp vào liên kết này để thay đổi mật khẩu. Liên kết này sẽ hết hiệu lực trong 15 phút. <a href="${process.env.SERVER_URL}/api/auth/reset-password/?token=${token}">Nhấn vào đây!</a>`;
      const data = {
         email: user.email,
         html,
      };

      const response = await sendMail(data);
      return res.status(STATUS_CODE.OK).json({
         success: true,
         message: 'Please check mail',
         response,
      });
   } catch (error) {
      next(error);
   }
};
const resetPassword = async (req, res, next) => {
   try {
      const user = await db.User.findOne({ where: { id: req.user.id.id } });
      await db.User.update(
         { password: req.body.password },
         { where: { id: user.id } },
      );
      return res.status(STATUS_CODE.OK).json({
         success: true,
         message: 'Change password successfully',
      });
   } catch (error) {
      next(error);
   }
};

module.exports = { login, register, logout, forgotPassword, resetPassword };
