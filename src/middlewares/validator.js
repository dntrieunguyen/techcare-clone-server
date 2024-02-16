const { check } = require('express-validator');

let validateRegisterUser = () => {
   return [
      check('name', 'username does not Empty').notEmpty(),
      check('name', 'username more than 6 degits').isLength({ min: 6 }),
      check('email', 'email does not Empty').notEmpty(),
      check('email', 'Invalid email').isEmail(),
      check('password', 'password more than 6 degits').isLength({
         min: 6,
      }),
   ];
};

let validateLogin = () => {
   return [
      check('name', 'username does not Empty').notEmpty(),
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
