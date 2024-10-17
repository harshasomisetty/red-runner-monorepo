const userService = require('./user.service');
const { LeaderboardEntry } = require('../models');

/**
 * Get relative rank for a given userId.
 * @param {String} userId - The userId of the user.
 * @returns {Promise} - An array containing five entries above, the user's entry, and five entries below.
 */
async function GetRelativeRank(userId) {
  try {
    // Find the user's entry
    const userEntry = await LeaderboardEntry.findOne({ userId }).exec();
    if (!userEntry) {
      throw new Error('User not found in leaderboard');
    }

    // Find the rank of the user
    const userRank = (await LeaderboardEntry.countDocuments({ score: { $gt: userEntry.score } })) + 1;

    // Calculate the skip value, ensuring it is non-negative
    const skipValue = Math.max(userRank - 6, 0);

    // Calculate the total number of documents
    const totalEntries = await LeaderboardEntry.countDocuments().exec();

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
    const relativeEntries = await LeaderboardEntry.find({})
      .sort({ score: -1 })
      .skip(skipValue) // Use the calculated skip value
      .limit(limitValue) // Use the calculated limit value
      .exec();

    return relativeEntries;
  } catch (error) {
    console.error('Error getting relative rank:', error);
    throw error;
  }
}

/**
 * Logout
 * @returns {Promise}
 * @param userId
 * @param score
 */
const AddLeaderboardEntry = async (userId, score) => {
  try {
    // Find document by user ID
    const userEntryDocument = await LeaderboardEntry.findOne({ userId: userId });

    if (userEntryDocument) {
      // Update the score only if the new score is higher
      if (userEntryDocument.score < score) {
        userEntryDocument.score = score;
        await userEntryDocument.save();
        console.log('Score updated to a higher value.');
      } else {
        console.log('Existing score is higher or equal, no update made.');
      }

      return userEntryDocument;
    } else {
      // Insert new document if none exists
      const user = await userService.getUserById(userId);
      const leaderboardEntry = new LeaderboardEntry({ userId: userId, score: score, name: user.name });
      await leaderboardEntry.save();
      console.log('New leaderboard entry inserted.');
      return leaderboardEntry;
    }
  } catch (error) {
    console.error('Error updating or inserting leaderboard entry:', error);
  }
};

const GetLeaderboard = async () => {
  try {
    // Find document by user ID
    const sortedLeaderboard = await LeaderboardEntry.find({}).sort({ score: -1 }).limit(50);

    // Convert the sorted leaderboard entries to JSON format
    return JSON.stringify(sortedLeaderboard, null, 2);
  } catch (error) {
    console.error('Error updating or inserting leaderboard entry:', error);
  }
};

module.exports = {
  AddLeaderboardEntry,
  GetLeaderboard,
  GetRelativeRank,
};
