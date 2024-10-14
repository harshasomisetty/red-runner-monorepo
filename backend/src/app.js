const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors({
  origin: '*', // or specify your domain: 'https://gameshift.game.clvtechnologies.com'
  methods: ['GET', 'POST', 'OPTIONS'], // Define allowed methods
  credentials: true // Set to true if you're using cookies or authentication tokens
}));

app.options('*', cors({ origin: '*' }));

passport.use('jwt', jwtStrategy);
app.use(passport.initialize());

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  console.log(`[Express] Received ${req.method} request for ${req.url}`);
  next();
});

app.use((req, res, next) => {
  if (req.url.startsWith('/socket.io/') || req.url.startsWith('/qr-signup/socket.io/')) {
    console.log('[Express] Passing request to Socket.IO:', req.url);
    return next();
  }
  console.log('[Express] Passing request to Express routes:', req.url);
  next();
});

// After your routes, but before error handlers
app.use((req, res, next) => {
  console.log(`[Express] Unhandled request: ${req.method} ${req.url}`);
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
