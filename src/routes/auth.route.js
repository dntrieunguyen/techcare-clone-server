const express = require('express');
const { validate } = require('../middlewares/validator');
const auth = require('../controllers/auth.controller');
const { verifyForgotPasswordToken } = require('../middlewares/jwt');

const route = express.Router();

route.post('/login', [validate.validateLogin()], auth.login);
route.post('/register', [validate.validateRegisterUser()], auth.register);
route.post('/logout', auth.logout);

route.post('/forgot-password', auth.forgotPassword);
route.get('/reset-password', verifyForgotPasswordToken, auth.resetPassword);
module.exports = route;
