const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
console.log(config.env);
console.log(config.mongoose);
const logger = require('./config/logger');
const http = require('http');
const socket = require('./socket/socket.controller');

let server;
const mongoUrl = config.mongoose.url;
mongoose
  .connect(mongoUrl, {
    ...config.mongoose.options,
    user: config.mongoose.username,
    pass: config.mongoose.password,
    dbName: config.mongoose.dbName,
  })
  .then(() => {
    logger.info('Connected to MongoDB');

    server = http.createServer(app);
    const io = socket.Init(server);
    app.set('io', io);

    server.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
