const { Connnection } = require("../../index");
const KEYS = require("../../_config/keys");

exports.publishInAppNotifcation = async (notificationType, data) => {
  try {
    let NotificationPublisher = new Connnection(
      KEYS.AMQP_URI,
      KEYS.IN_APP_NOTIFICATION_QUEUE,
      async (msg) => {
        console.log(`${KEYS.IN_APP_NOTIFICATION_QUEUE} publishing...`);
      }
    );
    const channel = await NotificationPublisher.getChannel();
    await NotificationPublisher.publish(notificationType, data);
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
  } catch (error) {
    console.error(error);
  }
};
