const { Connnection } = require("../../index");
const KEYS = require("../../_config/keys");

exports.publishTpoUpdateWalletQueue = async (id, data) => {
  try {
    let UpdateWalletPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.WALLET_UPDATE_QUEUE,
      async (msg) => {
        console.log(`${KEYS.WALLET_UPDATE_QUEUE} publishing...`);
      }
    );
    const channel = await UpdateWalletPublisher.getChannel();
    await UpdateWalletPublisher.publish(id, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
