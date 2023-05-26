const SessionService = require("../services/session.services")
const { jwtVerify } = require("../../../../_helpers/jwtUtil");


class VallidateService {
  constructor () {
  }

  async vallidateToken (data, token) {
    // check if token session is still active
   const session = await new SessionService().findARecord({session_token: token});
   if(!session){
    return {
      error: false,
      message: "InValid Token",
      data: data,
    };
   }
   else if (session. is_active === false ) {
      return {
        error: true,
        message: "You have logged out From this Session",
        data: null,
      };
    } else{
      return {
        error: false,
        message: "Token Valid",
        data: data,
      };
    }

  }
}

module.exports = VallidateService;
