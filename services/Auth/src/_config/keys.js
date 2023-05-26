const dotenv = require("dotenv");
dotenv.config();

const KEYS = {
  mongoURI: process.env.MONGODBURI,
  JWTSecret: process.env.JWTSECRET,
  expiresIn: process.env.EXPIRES_IN,
  redisHost: process.env.REDISHOST,
  redisPort: process.env.REDISPORT,
  redisPassword: process.env.REDISPASSWORD,
  appVersion: process.env.APP_VERSION,
  AMQP_URI:process.env.AMQP_URI,
  IN_APP_NOTIFICATION_QUEUE: process.env.IN_APP_NOTIFICATION_QUEUE,
  CREATE_WALLET_QUEUE: process.env.CREATE_WALLET_QUEUE,
  CREATE_USER_QUEUE: process.env.CREATE_USER_QUEUE
};

module.exports = KEYS;
