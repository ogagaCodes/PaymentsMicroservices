const { Connnection } = require("../../index");
const KEYS = require("../../_config/keys");

exports.publishToTransactionsQueue = async (id, data) => {
  try {
    let TransactionsPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.TRANSACTION_QUEUE,
      async (msg) => {
        console.log(`${KEYS.TRANSACTION_QUEUE} publishing...`);
      }
    );
    const channel = await TransactionsPublisher.getChannel();
    await TransactionsPublisher.publish(id, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
