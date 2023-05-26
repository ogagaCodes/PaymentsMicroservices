const Joi = require("joi");

exports.depositFundsSchema = Joi.object({
    pin: Joi.string().required(),
    amount: Joi.number().positive().required(),
    channel: Joi.string().valid("card", "wallet-wallet", "bank-transfer", "dev-test").required()
  });