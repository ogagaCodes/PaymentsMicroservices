const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.getUserByIdQuerySchema = Joi.object({
    user_id: Joi.objectId().required(),
  });