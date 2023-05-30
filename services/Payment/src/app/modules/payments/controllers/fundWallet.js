const { HTTP } = require('../../../../_constants/http');
const { RESPONSE } = require('../../../../_constants/response');
const createError = require('../../../../_helpers/createError');
const { createResponse } = require('../../../../_helpers/createResponse');
const WalletUpdateQueue = require("../../../../_queue/publishers/updateWallet.publishers");
const logger  = require('../../../../../logger.conf');

exports.creditWallet = async (req, res, next) => {
  try {
    // call gateway here eg - stripe, interswitc, payastack etc
    const gateway = await chargeCard(req.body);
// publish to update wallet queue
  const publishToWalletQueue = await WalletUpdateQueue.publishTpoUpdateWalletQueue(
    req.user.user_id,
    req.body
  );
    return createResponse(`Deposit Initiated`, {payer: req.user.username, amount: req.body.amount})(res, HTTP.OK);
  
  } catch (err) {
    logger.error(err);
    logger.debug("USER ID", req.user.user_id)
    return next(createError.InternalServerError(err));
  }
};
