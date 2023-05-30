const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const SavingsPlanService = require("../services/savingsPlan.sevices");

exports.addSavingsPlan = async (req, res, next) => {
  try {
    // check if user is on this plan
    const hasPlan = await new SavingsPlanService().findOne({
      user_id: req.user.user_id,
      plan: req.body.plan,
    });
    const bodyData = {
      user_id: req.user.user_id,
      ...req.body,
    };
    if (hasPlan) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "You have this plan running",
            statusCode: HTTP.SERVER_ERROR,
            data: null,
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    const newSavingsPlan = await new SavingsPlanService().Create(bodyData);
    return createResponse("New Savings Plan Added", newSavingsPlan)(
      res,
      HTTP.OK
    );
  } catch (err) {
    console.error(err);

    return next(createError.InternalServerError(err));
  }
};
