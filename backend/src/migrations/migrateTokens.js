const mongoose = require('mongoose');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const config = require('../config/config');

// Assuming you have a Mongoose Token model defined
const Token = require('../models/token.model');

function mapTokenType(type) {
  switch (type.toUpperCase()) {
    case 'REFRESH':
      return 'REFRESH';
    case 'RESET_PASSWORD':
      return 'RESET_PASSWORD';
    case 'VERIFY_EMAIL':
      return 'VERIFY_EMAIL';
    default:
      console.warn(`Unknown token type: ${type}. Defaulting to REFRESH.`);
      return 'REFRESH';
  }
}

async function migrateTokens() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoose.url, {
      ...config.mongoose.options,
      user: config.mongoose.username,
      pass: config.mongoose.password,
      dbName: config.mongoose.dbName,
    });
    console.log('Connected to MongoDB');

    // Fetch all tokens from MongoDB
    const tokens = await Token.find({});
    console.log(`Found ${tokens.length} tokens in MongoDB`);

    let createdCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    // Migrate each token to PostgreSQL
    for (const token of tokens) {
      const user = await prisma.user.findUnique({
        where: { userId: token.user },
      });

      if (!user) {
        console.log(`User not found for token: ${token._id}`);
        skippedCount++;
        continue;
      }

      const existingToken = await prisma.token.findUnique({
        where: { token: token.token },
      });

      if (existingToken) {
        // Update existing token
        await prisma.token.update({
          where: { id: existingToken.id },
          data: {
            userId: user.id,
            type: mapTokenType(token.type),
            expires: token.expires,
            blacklisted: token.blacklisted || false,
            updatedAt: token.updatedAt,
          },
        });
        updatedCount++;
      } else {
        // Create new token
        await prisma.token.create({
          data: {
            token: token.token,
            userId: user.id,
            type: mapTokenType(token.type),
            expires: token.expires,
            blacklisted: token.blacklisted || false,
            createdAt: token.createdAt,
            updatedAt: token.updatedAt,
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

migrateTokens();
