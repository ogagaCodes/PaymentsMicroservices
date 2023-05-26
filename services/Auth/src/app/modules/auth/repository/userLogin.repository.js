const Repository = require("../../../Repository");
const Login = require("../models/userLogin.model");

class LoginRepository extends Repository {
    constructor() {
        super(Login);
    };
}

module.exports = new LoginRepository();