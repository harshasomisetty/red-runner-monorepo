const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Authentication error'));
  }

  if (!user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'User not found in database'));
  }

  req.user = user;

  if (!user.userId) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Invalid user data'));
  }

  req.body.userId = user.userId;

  let hasRequiredRights = true;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
  }

  if (!hasRequiredRights || (req.query.userId && req.query.userId !== user.userId)) {
    return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
  }
  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
