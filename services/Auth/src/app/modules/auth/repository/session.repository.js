const Repository = require("../../../Repository");
const Session = require("../models/session.model");

class SessionRepository extends Repository {
    constructor() {
        super(Session);
    };
}

module.exports = new SessionRepository();