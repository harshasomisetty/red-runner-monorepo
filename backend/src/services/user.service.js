const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const validator = require('validator');
const ApiError = require('../utils/ApiError');
const gsUtil = require('../utils/gsUtil');

const createUser = async (userBody) => {
  if (!validator.isEmail(userBody.email)) {
    throw new ApiError(400, 'Invalid email');
  }

  if (!userBody.name) {
    userBody.name = gsUtil.shortName();
  }

  return prisma.user.create({ data: userBody });
};

const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const getUserByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};

const updateUserById = async (userId, updateBody) => {
  return prisma.user.update({
    where: { id: userId },
    data: updateBody,
  });
};

const deleteUserById = async (userId) => {
  return prisma.user.delete({ where: { id: userId } });
};

const doesUserExist = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { userId: userId },
  });
  return !!user;
};

/**
 * Query for users
 * @param {Object} filter - Filter conditions
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const sortBy = options.sortBy || 'createdAt:desc';
  const [field, order] = sortBy.split(':');

  const skip = (page - 1) * limit;

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where: filter,
      take: limit,
      skip: skip,
      orderBy: { [field]: order.toLowerCase() },
    }),
    prisma.user.count({ where: filter }),
  ]);

  return {
    results: users,
    page,
    limit,
    totalPages: Math.ceil(totalCount / limit),
    totalResults: totalCount,
  };
};

const getUserByWallet = async (wallet) => {
  return prisma.user.findUnique({
    where: { walletId: wallet },
  });
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  doesUserExist,
  queryUsers,
  getUserByWallet,
};
