const auth = require('./auth.route');
const { notFound, errHandler } = require('../middlewares/errorHandler');

const initRoutes = app => {
   app.use('/api/v1/auth', auth);

   app.use(notFound);
   app.use(errHandler);
};

module.exports = { initRoutes };
