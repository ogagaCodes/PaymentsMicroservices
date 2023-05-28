const axios = require("axios");
const { jwtSign, jwtDecode } = require("../../../../_helpers/jwtUtil");
const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const { hashPassword } = require("../../../../_helpers/passwordHash");
const LoginService = require("../services/userLogin.services");

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
      // sign jwt
      const token = jwtSign(isUser._id);
      // create login record
      const loginData = {
        username: username,
        phone_number: req.body.phone_number,
        email: req.body.email,
        auth_type: req.body.auth_type,
        user_id: isUser._id,
        user_type: req.body.user_type,
        is_loggedIn: true,
        access_token: token,
        password,
      };
      logger.log(loginData);
      const loginRecord = await new LoginService().create(loginData);
      // publsih to create user queue
      const bodyData = {
        user_id: isUser._id,
        username,
        phone_number: req.body.phone_number,
        email: email,
        auth_type: req.body.auth_type || "lc",
        user_type: req.body.user_type,
      };

      const publishToCreateUserQueue =
        await CreateUserPublisher.publishToCreateUserQueue(bodyData);

      // publish to create wallet queue to create users wallet
      const createWalletData = {
        user_id: isUser_id,
        user_email: email,
        user_phone_number: phone_number,
        user_type: "user"
      }
      await CreateWalletPublisher.publishToCreateWalletQueue(createWalletData);
      //    data to return
      const resData = {
        ...loginRecord._doc,
        access_token: token,
      };
      return createResponse(`User Created, Please Login`, resData)(
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
