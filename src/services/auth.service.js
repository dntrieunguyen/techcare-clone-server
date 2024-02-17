import * as auth from '../controllers/auth.controller.js';
const db = require('../models');

const loginService = ({ username, password }) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = db.User.findOne({
            where: username,
            defaults: {
               password: password,
            },
         });
      } catch (error) {
         reject(error);
      }
   });
const registerService = ({ username, password, phone, email }, next) =>
   new Promise(async (resolve, reject) => {
      try {
         const response = db.User.create({
            where: { phone },
            defaults: {
               username,
               password,
               phone,
               email,
            },
         });
         resolve({
            response,
         });
      } catch (error) {
         reject(next(error));
      }
   });

module.exports = { loginService, registerService };
