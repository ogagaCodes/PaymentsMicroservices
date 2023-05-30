const Joi = require("joi");

exports.userSavingsPlanSchema = Joi.object({
    user_id: Joi.string().required(),
  });