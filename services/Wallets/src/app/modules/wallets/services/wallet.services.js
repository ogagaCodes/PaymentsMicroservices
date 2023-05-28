const WalletRepository = require ('../repository/wallet.repository');

class WallettService {
  constructor () {
    this.WalletRepository = WalletRepository;
  }

  async CreateWallet (data) {
    return this.WalletRepository.create (data)
  }

  async findWallet (query) {
    return this.WalletRepository.findOne (query)
  }

  async update (condition, update) {
    return this.WalletRepository.update (condition, update)

  }
  async deleteAll (condition = {}) {
    return this.WalletRepository.delete(condition)

  }


  async all (limit, page, data) {
    return this.WalletRepository.all (limit, page, data)
  }

  async streamAll (queryData) {
    return this.WalletRepository.streamData(queryData)
  }

  async findWalletById (id) {
    return this.WalletRepository.findById (id)
  }
}

module.exports = WallettService;