const { HTTP } = require("../../../../_constants/http");
const { RESPONSE } = require("../../../../_constants/response");
const createError = require("../../../../_helpers/createError");
const { createResponse } = require("../../../../_helpers/createResponse");
const { comparePassword } = require("../../../../_helpers/passwordHash");
const {
  jwtSign,
  jwtSignAccessLogsData,
  jwtDecode,
} = require("../../../../_helpers/jwtUtil");
const LoginService = require("../services/userLogin.services");
const SessionService = require("../services/session.services");
const logger = require("../../../../../logger.conf");
exports.login = async (req, res, next) => {
  try {
    //  verify user exist=====check the login model
    const userLogin = await new LoginService().findARecord({
      username: req.body.username,
    });
    if (!userLogin) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message: "User Does Not Exist",
            statusCode: HTTP.SERVER_ERROR,
            data: {},
            code: HTTP.UNAUTHORIZED,
          },
        ])
      );
    } else {
        const passwordMatch = await comparePassword(
          userLogin.password,
          req.body.password
        );
        if (!passwordMatch) {
          return next(
            createError(HTTP.UNAUTHORIZED, [
              {
                status: RESPONSE.ERROR,
                message: "Invalid Password/Username",
                statusCode: HTTP.SERVER_ERROR,
                data: null,
                code: HTTP.UNAUTHORIZED,
              },
            ])
          );
      } else {
        const user_id = userLogin.user_id;
        const accessToken = jwtSign(user_id);

        const { iat } = jwtDecode(accessToken) || {};
        // update referesh token model
        const updateduser = await new LoginService().update(
          { username: req.body.username },
          { is_loggedIn: true, access_token: accessToken }
        );
        // generate session id
        const now = Date.now();
        const session = {
          loggedInTime: now,
          user_id: userLogin.user_id,
        };
        const session_id = jwtSignAccessLogsData(session);
        // push login time to access logs
        // data to access logs
        let sessionData = {
          session_id,
          session_token: accessToken,
          user_id: String(userLogin.user_id),
          email: String(userLogin.email),
          is_active: true,
          lat: req.body.lat || null,
          long: req.body.long || null,
          logged_in_time: now,
          role: String(userLogin.user_type),
        };
        const userSession = await new SessionService().createSession(
          sessionData
        );
        const resData = {
          session_id: userSession.session_id,
          accessToken,
          ...updateduser,
        };
        return createResponse("User Logged In", resData)(res, HTTP.OK);
      }
    }
  } catch (err) {
    logger.error(err);
    console.log(err);
    return next(createError.InternalServerError(err));
  }
};
