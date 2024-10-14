const Joi = require('joi');
const { password } = require('./custom.validation');

const registerOrLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    tokenId: Joi.string().required(),
    userId: Joi.string().required(),
  }),
};

const walletLogin = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    wallet: Joi.string().required(),
    sessionId: Joi.string().optional(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  registerOrLogin,
  walletLogin,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
