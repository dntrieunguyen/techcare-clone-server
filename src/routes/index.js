const auth = require('./auth.route');
const ads = require('./ads.route');
const { notFound, errHandler } = require('../middlewares/errorHandler');

const initRoutes = app => {
   app.use('/api/v1/auth', auth);
   app.use('/api/v1/ads', ads);

   app.use(notFound);
   app.use(errHandler);
};

module.exports = { initRoutes };
