const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const { PrismaClient } = require('@prisma/client');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

const prisma = new PrismaClient();

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserByUserId(refreshTokenDoc.userId);
    if (!user) {
      throw new Error();
    }
    await prisma.token.delete({ where: { id: refreshTokenDoc.id } });
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'refresh auth Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserByUserId(resetPasswordTokenDoc.userId);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await prisma.token.deleteMany({
      where: { userId: user.id, type: tokenTypes.RESET_PASSWORD },
    });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await userService.getUserByUserId(verifyEmailTokenDoc.userId);
    if (!user) {
      throw new Error();
    }
    await prisma.token.deleteMany({
      where: { userId: user.id, type: tokenTypes.VERIFY_EMAIL },
    });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

module.exports = {
  refreshAuth,
  resetPassword,
  verifyEmail,
};
