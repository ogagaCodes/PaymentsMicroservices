const Joi = require("joi");

exports.creditWalletSchema = Joi.object({
    user_id: Joi.string().required(),
  });