const Repository = require("../../../Repository");
const Wallet = require("../models/wallet.model");

class WalletRepository extends Repository {
    constructor() {
        super(Wallet);
    };
}

module.exports = new WalletRepository();