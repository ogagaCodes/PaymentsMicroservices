const Joi = require("joi");

exports.fundWalletSchema = Joi.object({
    pin: Joi.string().required(),
    amount: Joi.number().positive().required(),
    channel: Joi.string().valid("card", "wallet-wallet", "bank-transfer", "dev-test").required()
  });