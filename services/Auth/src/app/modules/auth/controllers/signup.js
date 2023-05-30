const axios = require("axios");
const { jwtSign, jwtDecode, jwtSignAccessLogsData, } = require("../../../../_helpers/jwtUtil");
const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const { hashPassword } = require("../../../../_helpers/passwordHash");
const LoginService = require("../services/userLogin.services");
const SessionService = require("../services/session.services");
const CreateUserPublisher = require("../../../../_queue/publishers/createUser.publisher");
const CreateWalletPublisher = require("../../../../_queue/publishers/createWallet.publisher");

const logger = require("../../../../../logger.conf");

exports.signUp = async (req, res, next) => {
  try {
    let password;
    const email = req.body.email && req.body.email.toLowerCase();
    const username = req.body.username;
    // check if usr exists
    const isUser = await new LoginService().findARecord({ email });
    const usernameExists = await new LoginService().findARecord({ username });
    if (usernameExists && usernameExists.username === req.body.username) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "Username Taken",
            statusCode: HTTP.OK,
            data: usernameExists,
            code: HTTP.OK,
          },
        ])
      );
    }
    if (isUser) {
      return next(
        createError(HTTP.OK, [
          {
            status: RESPONSE.SUCCESS,
            message: "User Exists",
            statusCode: HTTP.OK,
            data: isUser,
            code: HTTP.OK,
          },
        ])
      );
    } else {
      // hash passwords and generate toke
      password = hashPassword(req.body.password);

      // create login record
      const loginData = {
        username: username,
        phone_number: req.body.phone_number,
        email: req.body.email,
        auth_type: req.body.auth_type,
        user_type: "user",
        is_loggedIn: true,
        password,
      };
      logger.log(loginData);
      const loginRecord = await new LoginService().create(loginData);
      // update login record with user_d
      const updateLoginRecord = await new LoginService().update(
        { email },
        { user_id: loginRecord._id }
      );
      // publsih to create user queue
      const bodyData = {
        user_id: loginRecord._id,
        username,
        phone_number: req.body.phone_number,
        email: email,
        auth_type: req.body.auth_type || "lc",
        user_type: "user",
      };

      const publishToCreateUserQueue =
        await CreateUserPublisher.publishToCreateUserQueue(bodyData);

      // publish to create wallet queue to create users wallet
      const createWalletData = {
        user_id: loginRecord._id,
        user_email: email,
        user_phone_number: req.body.phone_number,
        user_type: "user",
      };
      await CreateWalletPublisher.publishToCreateWalletQueue(createWalletData);
      //    data to return
      // sign jwt
      const token = jwtSign(loginRecord._id);
      // generate session id
      const now = Date.now();
      const session = {
        loggedInTime: now,
        user_id: loginRecord._id,
      };
      const session_id = jwtSignAccessLogsData(session);
      // push login time to access logs
      // data to access logs
      let sessionData = {
        session_id,
        session_token: token,
        user_id: String(updateLoginRecord.user_id),
        email: email,
        is_active: true,
        lat: req.body.lat || null,
        long: req.body.long || null,
        logged_in_time: now,
        role: "user",
      };
      const userSession = await new SessionService().createSession(sessionData);
      const resData = {
        ...loginRecord._doc,
        access_token: token,
      };
      return createResponse(`User Created`, resData)(
        res,
        HTTP.CREATED
      );
    }
  } catch (err) {
    console.log(err);
    logger.info(err);
    return next(createError.InternalServerError(err));
  }
};
