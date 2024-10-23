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

  // Check if user already exists by email or userId
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: userBody.email }, { userId: userBody.userId }],
    },
  });

  if (existingUser) {
    if (existingUser.email === userBody.email) {
      throw new ApiError(409, 'Email already in use');
    }
    if (existingUser.userId === userBody.userId) {
      throw new ApiError(409, 'User ID already exists');
    }
  }

  return prisma.user.create({ data: userBody });
};

const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id } });
};

const getUserByUserId = async (userId) => {
  return prisma.user.findUnique({ where: { userId } });
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
  try {
    console.log(`Attempting to find user with wallet: ${wallet}`);
    const user = await prisma.user.findFirst({
      where: { walletId: wallet },
    });

    if (!user) {
      console.log(`No user found with wallet address: ${wallet}`);
      return null;
    }

    console.log(`User found with wallet address: ${wallet}`);
    return user;
  } catch (error) {
    console.error(`Error in getUserByWallet: ${error.message}`);
    console.error(error.stack);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error retrieving user by wallet address');
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByUserId,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  doesUserExist,
  queryUsers,
  getUserByWallet,
};
