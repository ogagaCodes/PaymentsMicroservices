const Joi = require("joi").extend(require("@joi/date"));

exports.addSavingsPlanSchema = Joi.object({
    amount: Joi.number().positive().required(),
    start_deposit_date: Joi.date().format(["YYYY/MM/DD", "DD-MM-YYYY"]).required(),
    end_deposit_date: Joi.date().format(["YYYY/MM/DD", "DD-MM-YYYY"]).optional(),
    plan: Joi.string().valid('o-wealth', 'target').required(),
    auto_deposit:Joi.string().valid('daily', 'weekly', 'monthly', 'yearly', 'rately').required(),
  });