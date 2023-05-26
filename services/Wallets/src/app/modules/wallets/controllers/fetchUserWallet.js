const { HTTP } = require('../../../../_constants/http');
const { RESPONSE } = require('../../../../_constants/response');
const createError = require('../../../../_helpers/createError');
const { createResponse } = require('../../../../_helpers/createResponse');
const WalletService = require('../services/wallet.services');

exports.walletDetails = async (req, res, next) => {
  try {
    //  verify user exist=====check the login model
  const wallet = await new WalletService().findWallet({user_id: req.user.user_id});
  if(!wallet){
    return next(
      createError(HTTP.UNAUTHORIZED, [
        {
          status: RESPONSE.ERROR,
          message:"No Wallet Found",
          statusCode: HTTP.SERVER_ERROR,
          data: null,
          code: HTTP.UNAUTHORIZED,
        },
      ])
    );
  }
          return createResponse("User Wallet Details Retrieved", wallet)(res, HTTP.OK);
  
  } catch (err) {
    console.error(err);

    return next(createError.InternalServerError(err));
  }
};
