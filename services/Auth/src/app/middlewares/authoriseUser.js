const { HTTP } = require("../../_constants/http");
const { RESPONSE } = require("../../_constants/response");
const createError = require("../../_helpers/createError");
const { jwtVerify } = require("../../_helpers/jwtUtil");
const LoginService = require("../modules/auth/services/userLogin.services");
const SessionLogsService = require("../modules/auth/services/session.services");
const logger = require("../../../logger.conf");

exports.authorize = (role = []) => {
  return async (req, res, next) => {
    console.log("HEADRERS :", req.headers);
    const message = "Unauthorized";
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    if (!token) {
      return next(
        createError(HTTP.UNAUTHORIZED, [
          {
            status: RESPONSE.ERROR,
            message,
            statusCode: HTTP.UNAUTHORIZED,
          },
        ])
      );
    }
    try {
      const user = jwtVerify(token);
      if(user){
        const LoginRecord = await new LoginService().findARecord(
          { user_id: user._id }
        );
        if(!LoginRecord){
          return next(
            createError(HTTP.UNAUTHORIZED, [
              {
                status: RESPONSE.ERROR,
                message,
                statusCode: HTTP.UNAUTHORIZED,
              },
            ])
          );
          ``;
        } else {
          // check if session is still active
          const session = await new SessionLogsService().findASession({
            session_token: token,
          });
          if (session && !session.is_active) {
            return next(
              createError(HTTP.UNAUTHORIZED, [
                {
                  status: RESPONSE.ERROR,
                  message: "This Session Has Been Logged Out",
                  statusCode: HTTP.UNAUTHORIZED,
                  data: {},
                  code: HTTP.UNAUTHORIZED,
                },
              ])
            );
          } else {
            if(role.includes(String(LoginRecord.user_type))){
              logger.info(LoginRecord);
              req.user = LoginRecord;
              req.token = token;
              next();
            } else {
              return next(
                createError(HTTP.UNAUTHORIZED, [
                  {
                    status: RESPONSE.ERROR,
                    message: "Unauthorized",
                    statusCode: HTTP.UNAUTHORIZED,
                    data: {},
                    code: HTTP.UNAUTHORIZED,
                  },
                ])
              );
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
      return next(createError.InternalServerError());
    }
  };
};
