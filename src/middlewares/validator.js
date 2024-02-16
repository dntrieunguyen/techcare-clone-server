const { check } = require('express-validator');

let validateRegisterUser = () => {
   return [
      check('username', 'username does not Empty').notEmpty(),
      check('username', 'username more than 6 degits').isLength({ min: 5 }),
      check('email', 'email does not Empty').notEmpty(),
      check('email', 'Invalid email').isEmail(),
      check('password', 'password more than 6 degits').isLength({
         min: 6,
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
