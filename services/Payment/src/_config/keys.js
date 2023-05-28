const dotenv = require("dotenv");
dotenv.config();

const KEYS = {
  MONGODBURI: process.env.MONGODBURI,
  AMQP_URI:process.env.AMQP_URI,
  WALLET_UPDATE_QUEUE: process.env.WALLET_UPDATE_QUEUE,
  IN_APP_NOTIFICATION_QUEUE: process.env.IN_APP_NOTIFICATION_QUEUE
};

module.exports = KEYS;
