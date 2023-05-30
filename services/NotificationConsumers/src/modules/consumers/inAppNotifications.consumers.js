const { Connnection } = require("../init_consumers");
const KEYS = require("../../_config/keys");
const { sendSmsTwilio } = require("../../_helpers/sms/index");
const { sendFailedDepositMail } = require("../../../src/_helpers/mail/index");

const NotificationConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.IN_APP_NOTIFICATION_QUEUE,
  async (msg) => {
    const channel = await NotificationConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);
      const { type, bodyData } = JSON.parse(message);
      try {
        console.log("TYPE ==== ", type);
        //   send notification based on type
        if (type === "sms") {
          console.log("GOt Here......");
          // await sendSmsTwilio(bodyData);
          console.log("Sending Sms.................");
        }
        if (type === "mails") {
          console.log("executing this......");
          for (let i = 0; i < bodyData.length; i++) {
            // bbbbbbb
          }
        }
        if (type === "push") {
          // await helpers.sendPushNotification(bodyData);
          console.log("GOT HERE........");
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
