const mongoose = require('mongoose');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const config = require('../config/config');

// Assuming you have a Mongoose LeaderboardEntry model defined
const LeaderboardEntry = require('../models/leadboardEntry.model');

async function migrateLeaderboardEntries() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoose.url, {
      ...config.mongoose.options,
      user: config.mongoose.username,
      pass: config.mongoose.password,
      dbName: config.mongoose.dbName,
    });
    console.log('Connected to MongoDB');

    // Fetch all leaderboard entries from MongoDB
    const leaderboardEntries = await LeaderboardEntry.find({});
    console.log(`Found ${leaderboardEntries.length} leaderboard entries in MongoDB`);

    let createdCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    // Migrate each leaderboard entry to PostgreSQL
    for (const entry of leaderboardEntries) {
      const user = await prisma.user.findUnique({
        where: { userId: entry.userId },
      });

      if (!user) {
        console.log(`User not found for leaderboard entry: ${entry._id}`);
        skippedCount++;
        continue;
      }

      const existingEntry = await prisma.leaderboardEntry.findUnique({
        where: { userId: user.id },
      });

      if (existingEntry) {
        // Update existing entry
        await prisma.leaderboardEntry.update({
          where: { id: existingEntry.id },
          data: {
            name: entry.name,
            score: entry.score,
          },
        });
        updatedCount++;
      } else {
        // Create new entry
        await prisma.leaderboardEntry.create({
          data: {
            userId: user.id,
            name: entry.name,
            score: entry.score,
          },
        });
        createdCount++;
      }
    }

    console.log(`Migration completed:`);
    console.log(`- Created: ${createdCount}`);
    console.log(`- Updated: ${updatedCount}`);
    console.log(`- Skipped: ${skippedCount}`);
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
    await mongoose.disconnect();
  }
}

migrateLeaderboardEntries();
