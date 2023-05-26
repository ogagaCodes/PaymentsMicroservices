const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 
const WalletService = require('../../app/modules/wallets/services/wallet.services');

const CreateWalletConsumer = new Connnection(KEYS.AMQP_URI, KEYS.CREATE_WALLET_QUEUE,
  async (msg) => {
    const channel = await CreateWalletConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        bodyData
      } = JSON.parse(message);

      try {
    //   create wallet here
    const newWallet = await new WalletService().CreateWallet(bodyData);
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while creating wallet: ${error}`);
        return channel.ack(msg);
      }
    }
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
    return null;
  });

  module.exports = CreateWalletConsumer;
