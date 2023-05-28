const { Connnection } = require("../init_consumers");
const KEYS = require("../../_config/keys");
const { helpers } = require("../../_helpers/index");

const NotificationConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.IN_APP_NOTIFICATION_QUEUE,
  async (msg) => {
    const channel = await NotificationConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const { notificationType, bodyData } = JSON.parse(message);

      try {
        //   send notification based on type
        if (notificationType === "sms") {
          await helpers.sendSMS(bodyData);
        }
        if (notificationType === "mail") {
          await helpers.sendSMS(bodyData);
        }
        if (notificationType === "push") {
          await helpers.sendPushNotification(bodyData);
        }
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while creating wallet: ${error}`);
        return channel.ack(msg);
      }
    }
    process.on("exit", (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
    });
    return null;
  }
);

module.exports = NotificationConsumer;
