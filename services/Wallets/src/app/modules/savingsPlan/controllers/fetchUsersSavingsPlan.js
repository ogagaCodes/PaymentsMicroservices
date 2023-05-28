const { HTTP } = require('../../../../_constants/http');
const { RESPONSE } = require('../../../../_constants/response');
const createError = require('../../../../_helpers/createError');
const { createResponse } = require('../../../../_helpers/createResponse');
const SavingsPlanService = require('../services/savingsPlan.sevices');

exports.savingsPlanDetails = async (req, res, next) => {
  try {
    //  verify user exist=====check the login model
  const savingsPlan = await new SavingsPlanService().all(req.query.limit, req.query.page,{user_id: req.user.user_id});
  if(savingsPlan && savingsPlan.data.length === 0){
    return next(
      createError(HTTP.UNAUTHORIZED, [
        {
          status: RESPONSE.ERROR,
          message:"No Savings Plan Found",
          statusCode: HTTP.SERVER_ERROR,
          data: null,
          code: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
          return createResponse("User savingsPlan Retrieved", savingsPlan)(res, HTTP.OK);
  
  } catch (err) {
    console.error(err);

    return next(createError.InternalServerError(err));
  }
};
