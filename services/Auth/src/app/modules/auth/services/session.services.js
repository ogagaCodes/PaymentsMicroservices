const SessionRepository = require("../repository/session.repository");

class SessionService {
  constructor() {
    this.SessionRepository = SessionRepository;
  }

  async createSession(data) {
    return this.SessionRepository.create(data);
  }

  async findASession(query) {
    return this.SessionRepository.findOne(query);
  }
  async find(query) {
    return this.SessionRepository.find(query);
  }
  async update(condition, update) {
    return this.SessionRepository.update(condition, update);
  }
  async deleteAll(condition) {
    return this.SessionRepository.deleteMany(condition);
  }

  async all(limit, page, data) {
    return this.SessionRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.SessionRepository.findById(id);
  }
}

module.exports = SessionService;
