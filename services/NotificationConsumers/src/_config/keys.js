const dotenv = require("dotenv");
dotenv.config();

const KEYS = {
  AMQP_URI:process.env.AMQP_URI,
  IN_APP_NOTIFICATION_QUEUE: process.env.IN_APP_NOTIFICATION_QUEUE,
  ZEPTO_MAIL_URI: process.env.ZEPTO_MAIL_URI,
  VERIFIED_DOMAIN: process.env.VERIFIED_DOMAIN,
  ZEPTO_MAIL_TOKEN: process.env.ZEPTO_MAIL_TOKEN,
  BOUNCE_ADDRESS: process.env.BOUNCE_ADDRESS
};

module.exports = KEYS;
