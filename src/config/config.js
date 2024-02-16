require('dotenv').config();

module.exports = {
   development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD || null,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false,
   },
   production: {
      username: process.env.DB_PROD_USER,
      password: process.env.DB_PROD_PASSWORD || null,
      database: process.env.DB_PROD_NAME,
      host: process.env.DB_PROD_HOST,
      dialect: 'mysql',
   },
};
