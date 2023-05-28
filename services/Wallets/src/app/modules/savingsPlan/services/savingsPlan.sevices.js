const SavingsPlanRepository = require("../repository/savingsPlan.repository");

class SavingsService {
  constructor() {
    this.SavingsPlanRepository = SavingsPlanRepository;
  }

  async Create(data) {
    return this.SavingsPlanRepository.create(data);
  }

  async findOne(query) {
    return this.SavingsPlanRepository.findOne(query);
  }

  async update(condition, update) {
    return this.SavingsPlanRepository.update(condition, update);
  }
  async deleteAll(condition = {}) {
    return this.SavingsPlanRepository.delete(condition);
  }

  async all(limit, page, data) {
    return this.SavingsPlanRepository.all(limit, page, data);
  }

  async streamAll(queryData) {
    return this.SavingsPlanRepository.streamData(queryData);
  }

  async findById(id) {
    return this.SavingsPlanRepository.findById(id);
  }
}

module.exports = SavingsService;
