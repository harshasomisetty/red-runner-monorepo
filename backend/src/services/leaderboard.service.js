const userService = require('./user.service');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Get relative rank for a given userId.
 * @param {String} userId - The userId of the user.
 * @returns {Promise} - An array containing five entries above, the user's entry, and five entries below.
 */
async function GetRelativeRank(userId) {
  try {
    // Find the user's entry
    const userEntry = await prisma.leaderboardEntry.findUnique({ where: { userId } });
    if (!userEntry) {
      throw new Error('User not found in leaderboard');
    }

    // Find the rank of the user
    const userRank =
      (await prisma.leaderboardEntry.count({
        where: { score: { gt: userEntry.score } },
      })) + 1;

    // Calculate the skip value, ensuring it is non-negative
    const skipValue = Math.max(userRank - 6, 0);

    // Calculate the total number of documents
    const totalEntries = await prisma.leaderboardEntry.count();

    // Calculate the limit to ensure we don't go out of bounds
    let limitValue = 11;

    // Adjust limit if user is near the top of the leaderboard
    if (userRank <= 5) {
      limitValue = Math.min(11, totalEntries);
    }

    // Adjust limit if user is near the bottom of the leaderboard
    if (totalEntries - userRank < 5) {
      limitValue = totalEntries - skipValue;
    }

    // Find the five entries above and five entries below
    const relativeEntries = await prisma.leaderboardEntry.findMany({
      orderBy: { score: 'desc' },
      skip: skipValue,
      take: limitValue,
    });

    return relativeEntries;
  } catch (error) {
    console.error('Error getting relative rank:', error);
    throw error;
  }
}

/**
 * Add or update a leaderboard entry
 * @param {string} userId
 * @param {number} score
 * @returns {Promise<LeaderboardEntry>}
 */
const AddLeaderboardEntry = async (userId, score) => {
  try {
    const user = await userService.getUserByUserId(userId);
    if (!user) {
      throw new Error(`User with userId ${userId} not found`);
    }

    // Find the user's highest scoring entry
    const highestEntry = await prisma.leaderboardEntry.findFirst({
      where: { userId: user.id },
      orderBy: { score: 'desc' },
    });

    if (highestEntry && highestEntry.score >= score) {
      console.log(`Existing score (${highestEntry.score}) is higher or equal, no update made.`);
      return highestEntry;
    }

    // Create a new entry
    const newEntry = await prisma.leaderboardEntry.create({
      data: {
        userId: user.id,
        score,
        name: user.name,
      },
    });

    console.log(`New leaderboard entry created for user ${userId} with score ${score}`);
    return newEntry;
  } catch (error) {
    console.error('Error creating leaderboard entry:', error);
    throw error;
  }
};

const GetLeaderboard = async () => {
  try {
    // Find top 50 entries sorted by score
    const sortedLeaderboard = await prisma.leaderboardEntry.findMany({
      orderBy: { score: 'desc' },
      take: 50,
    });

    // Convert the sorted leaderboard entries to JSON format
    return JSON.stringify(sortedLeaderboard, null, 2);
  } catch (error) {
    console.error('Error getting leaderboard:', error);
  }
};

module.exports = {
  AddLeaderboardEntry,
  GetLeaderboard,
  GetRelativeRank,
};
