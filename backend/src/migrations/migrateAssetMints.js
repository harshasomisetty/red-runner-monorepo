const mongoose = require('mongoose');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const config = require('../config/config');

// Assuming you have a Mongoose AssetMint model defined
const AssetMint = require('../models/assetMint.model');

// Helper function to map status string to Prisma enum
function mapStatus(status) {
  switch (status.toUpperCase()) {
    case 'PENDING':
      return 'PENDING';
    case 'INITIATED':
      return 'INITIATED';
    case 'COMPLETED':
      return 'COMPLETED';
    case 'FAILED':
      return 'FAILED';
    default:
      console.warn(`Unknown status: ${status}. Defaulting to PENDING.`);
      return 'PENDING';
  }
}

async function migrateAssetMints() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.mongoose.url, {
      ...config.mongoose.options,
      user: config.mongoose.username,
      pass: config.mongoose.password,
      dbName: config.mongoose.dbName,
    });
    console.log('Connected to MongoDB');

    // Fetch all asset mints from MongoDB
    const assetMints = await AssetMint.find({});

    // Migrate each asset mint to PostgreSQL
    for (const assetMint of assetMints) {
      await prisma.assetMint.create({
        data: {
          id: assetMint._id.toString(), // Convert ObjectId to string
          userId: assetMint.userId,
          gsAssetId: assetMint.gsAssetId,
          itemId: assetMint.itemId,
          status: mapStatus(assetMint.status), // Map the status to the correct enum value
          paymentDocumentId: assetMint.paymentDocumentId.toString(), // Convert ObjectId to string
          createdAt: assetMint.createdAt,
          updatedAt: assetMint.updatedAt,
        },
      });
    }

    console.log(`Migrated ${assetMints.length} asset mints`);
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
    await mongoose.disconnect();
  }
}

migrateAssetMints();
