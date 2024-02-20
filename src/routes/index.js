const auth = require('./auth.route');
const ads = require('./ads.route');
const user = require('./user.route');
const { notFound, errHandler } = require('../middlewares/errorHandler');

const initRoutes = app => {
   app.use('/api/auth', auth);
   app.use('/api/ads', ads);
   app.use('/api/user', user);

   app.use(notFound);
   app.use(errHandler);
};

module.exports = { initRoutes };
