const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const setupTestDB = () => {
  beforeAll(async () => {
    // Ensure we're connected to the database
    await prisma.$connect();
  });

  afterAll(async () => {
    // Disconnect after all tests are done
    await prisma.$disconnect();
  });
};

module.exports = setupTestDB;
