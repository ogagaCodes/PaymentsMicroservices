const { Connnection } = require("../../_queue/index");
const KEYS = require("../../_config/keys");
const WalletService = require("../../app/modules/wallets/services/wallet.services");
const NotificationQueue = require("../publishers/inAppNotification.publishers");
const UpdateWalletConsumer = new Connnection(
  KEYS.AMQP_URI,
  KEYS.WALLET_UPDATE_QUEUE,
  async (msg) => {
    const channel = await UpdateWalletConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const { type, user_id, bodyData } = JSON.parse(message);

      try {
        //    update records here
        let updateData;
        if (type === "refunding") {
          updateData = {};
        }
        if (type === "debit") {
          updateData = {};
        }
        if (type === "deposit") {
          updateData = {};
        }
        if (type === "reward") {
          updateData = {};
        }
        const updatedWallet = await new WalletService().update(
          { user_id },
          updateData
        );
        if (!updatedWallet) {
          // publsh To Notification Queue [Append Error Message]
          const notificationdata = {
            message: "Transaction Failure",
            code: 400,
            ...bodyData,
          };
          await NotificationQueue.publishInAppNotification(
            user_id,
            notificationdata
          );
          // Update Transactions
        } else {
          // publsih to Notifcation Queue[Append Error message]
          const notificationdata = {
            message: "Transaction Success",
            code: 20,
            ...bodyData,
          };
          await NotificationQueue.publishInAppNotification(
            user_id,
            notificationdata
          );
        }
        return channel.ack(msg);
      } catch (error) {
        // publsh To Notification Queue [Append Error Message]
        const notificationdata = {
          message: "Transaction Failure",
          code: 400,
          ...bodyData,
        };
        await NotificationQueue.publishInAppNotification(
          user_id,
          notificationdata
        );
        console.error(`Error while ${type}: ${error}`);
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

module.exports = UpdateWalletConsumer;
