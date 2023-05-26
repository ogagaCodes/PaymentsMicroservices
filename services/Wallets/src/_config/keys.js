const dotenv = require("dotenv");
dotenv.config();

const KEYS = {
  mongoURI: process.env.MONGODBURI,
  appVersion: process.env.APP_VERSION,
  AUTH_URI: process.env.AUTH_URI,
  AMQP_URI:process.env.AMQP_URI,
  CREATE_WALLET_QUEUE: process.env.CREATE_WALLET_QUEUE,
  WALLET_UPDATE_QUEUE: process.env.WALLET_UPDATE_QUEUE,
  IN_APP_NOTIFICATION_QUEUE: process.env.IN_APP_NOTIFICATION_QUEUE,
  TRANSACTION_QUEUE: process.env.TRANSACTION_QUEUE
};

module.exports = KEYS;
