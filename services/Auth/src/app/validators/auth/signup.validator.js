const Joi = require("joi").extend(require("@joi/date"));
Joi.objectId = require("joi-objectid")(Joi);

exports.registerUserSchema = Joi.object().keys({
  phone_number: Joi.string()
    .pattern(/^\+[0-9]+$/)
    .trim()
    .required()
    .label("Phone number"),
  password: Joi.string().required(),
  email: Joi.string().email().trim().required(),
  username: Joi.string()
    .trim().required(),
  first_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
});
