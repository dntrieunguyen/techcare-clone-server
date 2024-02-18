const session = require('express-session');
const mysql = require('mysql2/promise');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config();

const options = {
   host: 'localhost',
   port: process.env.DB_PORT,
   user: 'root',
   password: null,
   database: process.env.DB_NAME,
};

const pool = mysql.createPool(options);
const sessionStore = new MySQLStore(options, pool);

const sessionStoreConnect = () => {
   sessionStore
      .onReady()
      .then(() => {
         // MySQL session store ready for use.
         console.log('MySQLStore ready');
      })
      .catch(error => {
         // Something went wrong.
         throw new Error(error);
      });
};

module.exports = { sessionStoreConnect, sessionStore };
