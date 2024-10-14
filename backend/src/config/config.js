const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    GAMESHIFT_API_KEY: Joi.string().required().description('GameShift API key'),
    GAMESHIFT_DEVELOPER_WALLET_PRIVATE_KEY: Joi.string().required().description('GameShift developer wallet private key'),
    GAMESHIFT_DEVELOPER_WALLET_PUBLIC_KEY: Joi.string().required().description('GameShift developer wallet public key'),
    GAMESHIFT_BASE_URL: Joi.string().required().description('GameShift base URL'),
    GAMESHIFT_HOOKS_VALIDATION_KEY: Joi.string().required().description('Webhooks Validation Key'),
    GAMESHIFT_TOKEN_RR_ID: Joi.string().required().description('GameShift Token RR ID'),
    MONGO_INITDB_ROOT_USERNAME: Joi.string().required().description('Mongo Username'),
    MONGO_INITDB_ROOT_PASSWORD: Joi.string().required().description('Mongo Password'),
    MONGO_DBNAME: Joi.string().required().description('Mongo DB name'),

  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    username: envVars.MONGO_INITDB_ROOT_USERNAME,
    password: envVars.MONGO_INITDB_ROOT_PASSWORD,
    dbName: envVars.MONGO_DBNAME,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  gs: {
    gsApiKey: envVars.GAMESHIFT_API_KEY,
    gsWPrivateKey: envVars.GAMESHIFT_DEVELOPER_WALLET_PRIVATE_KEY,
    gsWPubKey: envVars.GAMESHIFT_DEVELOPER_WALLET_PUBLIC_KEY,
    gsBaseUrl: envVars.GAMESHIFT_BASE_URL,
    gsHooksValidationKey: envVars.GAMESHIFT_HOOKS_VALIDATION_KEY,
    gsTokenRRId: envVars.GAMESHIFT_TOKEN_RR_ID
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};
