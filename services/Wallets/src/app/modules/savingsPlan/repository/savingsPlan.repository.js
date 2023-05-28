const Repository = require("../../../Repository");
const SavingsPlan = require("../models/savingsPlan.model");

class SavingsRepository extends Repository {
    constructor() {
        super(SavingsPlan);
    };
}

module.exports = new SavingsRepository();