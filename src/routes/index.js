import auth from './auth.route.js';

const initRoutes = app => {
   app.use('/api/v1/auth', auth);
};

module.exports = { initRoutes };
