const mongoose = require('mongoose');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const config = require('../config/config');

// Assuming you have a Mongoose Payment model defined
const Payment = require('../models/payment.model');

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

async function migratePayments() {
  try {
    console.log('Starting payment migration...');

    // Connect to MongoDB
    await mongoose.connect(config.mongoose.url, {
      ...config.mongoose.options,
      user: config.mongoose.username,
      pass: config.mongoose.password,
      dbName: config.mongoose.dbName,
    });
    console.log('Connected to MongoDB');

    // Fetch all payments from MongoDB
    const payments = await Payment.find({});
    console.log(`Found ${payments.length} payments in MongoDB`);

    // Migrate each payment to PostgreSQL
    for (const payment of payments) {
      console.log(`Migrating payment with ID: ${payment._id}`);
      console.log(`Payment details: userId: ${payment.userId}, paymentId: ${payment.paymentId}`);

      try {
        // Check if the user exists in PostgreSQL
        const user = await prisma.user.findUnique({
          where: { userId: payment.userId },
        });

        if (!user) {
          console.error(`Error: User with userId ${payment.userId} not found in PostgreSQL. Cannot migrate this payment.`);
          continue;
        }

        await prisma.payment.create({
          data: {
            id: payment._id.toString(),
            userId: user.id, // Use the id field from the user model
            paymentId: payment.paymentId,
            itemId: payment.itemId,
            status: mapStatus(payment.status),
            isAutoMinted: payment.isAutoMinted,
            consentUrl: payment.consentUrl,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
          },
        });
        console.log(`Successfully migrated payment with ID: ${payment._id}`);
      } catch (error) {
        console.error(`Error migrating payment with ID: ${payment._id}`, error);
      }
    }

    console.log(`Migration completed for ${payments.length} payments`);
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
    await mongoose.disconnect();
    console.log('Disconnected from databases');
  }
}

migratePayments();
