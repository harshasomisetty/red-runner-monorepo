const mongoose = require('mongoose');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const config = require('../config/config');

// Assuming you have a Mongoose User model defined
const User = require('../models/user.model');
const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  // Add any other roles you have defined in your schema
};

async function migrateUsers() {
  try {
    // Connect to MongoDB

    await mongoose.connect(config.mongoose.url, {
      ...config.mongoose.options,
      user: config.mongoose.username,
      pass: config.mongoose.password,
      dbName: config.mongoose.dbName,
    });
    console.log('Connected to MongoDB');

    // Fetch all users from MongoDB
    const users = await User.find({});

    // Migrate each user to PostgreSQL
    for (const user of users) {
      await prisma.user.create({
        data: {
          id: user._id.toString(), // Convert ObjectId to string
          email: user.email,
          userId: user.userId,
          name: user.name,
          walletId: user.walletId,
          coinsCollected: user.coinsCollected,
          role: user.role.toUpperCase() === 'USER' ? Role.USER : Role.ADMIN, // Adjust this based on your roles
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    }

    console.log(`Migrated ${users.length} users`);
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
    await mongoose.disconnect();
  }
}

migrateUsers();
