const SessionService = require("../services/session.services");
const UserLoginService = require("../services/userLogin.services");
const { jwtVerify } = require("../../../../_helpers/jwtUtil");


class VallidateService {
  constructor () {
  }

  async vallidateToken (token) {
    // check if token session is still active
   const session = await new SessionService().findASession({session_token: token});
   if(!session){
    return {
      error: false,
      message: "InValid Token",
      data: {},
    };
   }
   else if (session. is_active === false ) {
      return {
        error: true,
        message: "You have logged out From this Session",
        data: null,
      };
    } else{
      // get user login details
      const user = jwtVerify(token);
      const userData = await new UserLoginService().findARecord({_id: user._id});
      return {
        error: false,
        message: "Token Valid",
        data: userData,
      };
    }

  }
}

module.exports = VallidateService;
