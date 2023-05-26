const { Connnection } = require("../../index");
const KEYS = require("../../_config/keys");

exports.publishToCreateWalletQueue = async (data) => {
  try {
    let CreateWalletPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.CREATE_WALLET_QUEUE,
      async (msg) => {
        console.log(`${KEYS.CREATE_WALLET_QUEUE} publishing...`);
      }
    );
    const channel = await CreateWalletPublisher.getChannel();
    await CreateWalletPublisher.publish(data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
