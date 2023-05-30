const { Connnection } = require("../../_queue/index");
const KEYS = require("../../_config/keys");

exports.publishToCreateUserQueue = async (data) => {
  try {
    let CreateUserPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.CREATE_USER_QUEUE,
      async (msg) => {
        console.log(`${KEYS.CREATE_USER_QUEUE} publishing...`);
      }
    );
    const channel = await CreateUserPublisher.getChannel();
    await CreateUserPublisher.publish(data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
