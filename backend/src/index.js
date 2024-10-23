const { PrismaClient } = require('@prisma/client');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const http = require('http');
const socket = require('./socket/socket.controller');

const prisma = new PrismaClient();
let server;

async function main() {
  try {
    await prisma.$connect();
    logger.info('Connected to PostgreSQL via Prisma');

    server = http.createServer(app);
    const io = socket.Init(server);
    app.set('io', io);

    server.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  } catch (error) {
    console.log('Final error', error);
    if (error.code === 'P1001' || error.message.includes("Can't reach database server")) {
      logger.error('Failed to connect to the database:', error.message);
      logger.error('Database connection details:', config.database);
    } else {
      logger.error('An unexpected error occurred:', error.message);
    }
    logger.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

main();

const exitHandler = async () => {
  if (server) {
    server.close(async () => {
      logger.info('Server closed');
      await prisma.$disconnect();
      process.exit(1);
    });
  } else {
    await prisma.$disconnect();
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', async () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
  await prisma.$disconnect();
});

module.exports = { prisma };
