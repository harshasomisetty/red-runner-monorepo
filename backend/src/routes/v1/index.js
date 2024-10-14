const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const leaderboardRoute = require('./leaderboard.route');
const gsRoute = require('./gs.route');
const shopRoute = require('./shop.route');
const hooksRoute = require('./gsHooks.route');
const config = require('../../config/config');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Red Runner API routes', status: 'OK' });
});

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/leaderboard',
    route: leaderboardRoute,
  },
  {
    path: '/gs',
    route: gsRoute,
  },
  {
    path: '/shop',
    route: shopRoute,
  },
  {
    path: '/gsHooks',
    route: hooksRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
