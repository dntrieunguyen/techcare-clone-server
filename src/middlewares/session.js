const session = require('express-session');
const { sessionStore } = require('../config/sessionStore.config');
require('dotenv').config();

const sessionConfig = app => {
   app.use(
      session({
         store: sessionStore,
         secret: process.env.SECRET_KEY,
         resave: false,
         saveUninitialized: true,
         cookie: {
            secure: false, // Use HTTPS
            httpOnly: false, // Prevent XSS attacks
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 3 * 24 * 60 * 60 * 1000, // Set session expiration (e.g., 24 hours)
         },
      }),
   );
};

module.exports = sessionConfig;
