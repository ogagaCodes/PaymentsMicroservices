const Joi = require("joi");

exports.userWalletSchema = Joi.object({
    user_id: Joi.string().required(),
  });