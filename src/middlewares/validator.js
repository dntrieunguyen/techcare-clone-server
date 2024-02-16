const { check } = require('express-validator');
const db = require('../models');

let validateRegisterUser = () => {
   return [
      check('username', 'username does not Empty').notEmpty(),
      check('email', 'email does not Empty').notEmpty(),
      check('phone', 'phone does not Empty').notEmpty(),
      check('phone', 'phone more than 10 degits').isLength({ min: 10 }),
      // check('username', 'username more than 6 degits').isLength({ min: 6 }),
      check('email', 'Invalid email').isEmail(),
      check('password', 'password more than 6 degits').isLength({
         min: 6,
      }),
      check('phone').custom(async (value, { req }) => {
         const existingUser = await db.User.findOne({
            where: { phone: value },
         });
         if (existingUser) throw new Error('Phone already use');
      }),
      check('username').custom(async (value, { req }) => {
         const existingUser = await db.User.findOne({
            where: { username: value },
         });
         if (existingUser) throw new Error(`${value} already exists`);
      }),
   ];
};

let validateLogin = () => {
   return [
      check('username', 'username does not Empty').notEmpty(),
      check('password', 'password more than 6 degits').isLength({
         min: 5,
      }),
   ];
};

let validate = {
   validateRegisterUser,
   validateLogin,
};

module.exports = { validate };
