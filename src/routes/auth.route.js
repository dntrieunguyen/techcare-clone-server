const express = require('express');
const { validate } = require('../middlewares/validator');
const auth = require('../controllers/auth.controller');

const route = express.Router();

route.post('/login', [validate.validateLogin()], auth.login);
route.post('/register', [validate.validateRegisterUser()], auth.register);
route.post('/logout', auth.logout);
module.exports = route;
