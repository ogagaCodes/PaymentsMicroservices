const LoginRepository = require("../repository/userLogin.repository");

class LoginService {
  constructor() {
    this.LoginRepository = LoginRepository;
  }

  async create(data) {
    return this.LoginRepository.create(data);
  }

  async findARecord(query) {
    return this.LoginRepository.findOne(query);
  }
  async find(query) {
    return this.LoginRepository.find(query);
  }
  async update(condition, update) {
    return this.LoginRepository.update(condition, update);
  }
  async deleteAll(condition) {
    return this.LoginRepository.deleteMany(condition);
  }

  async all(limit, page, data) {
    return this.LoginRepository.all(limit, page, data);
  }

  async findById(id) {
    return this.LoginRepository.findById(id);
  }
}

module.exports = LoginService;
