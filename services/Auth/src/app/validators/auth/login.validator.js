const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.loginUserSchema = Joi.object({
  username: Joi.string().trim().required().label("username"),
  password: Joi.string().required(),
  });
