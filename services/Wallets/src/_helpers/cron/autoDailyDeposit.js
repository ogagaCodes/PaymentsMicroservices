const cron = require("node-cron");
const { checkBalance } = require("../../_helpers/wallet/checkBalance");
const WalletService = require("../../../src/app/modules/wallets/services/wallet.services");
const SavingsPlanService = require("../../app/modules/savingsPlan/services/savingsPlan.sevices");
const {
  publishInAppNotification,
} = require("../../_queue/publishers/inAppNotification.publishers");

exports.startCron = async () => {
  // store user ids/success/failure
  const userList = [];
  const userNotificationdata = [];
  // daily cron [For demonstartion purposes]
  return cron.schedule("* * * * *", async () => {
    // get scheduled amount users plan
    const allUserSavingsPlan = await new SavingsPlanService()
      .streamAll({
        plan: "daily",
      })
      .eachAsync(async function (doc, i) {
        //  push user id and user amount scheduled into user ids/success/failure
        userList.push({ user_id: doc.user_id, amount: doc.amount });
      });
    //  get users wallet balance form wallet service
    for (let j = 0; j < userList.length; j++) {
      // search for balance and attach to userList
      const userWallet = await new WalletService().findWallet({
        user_id: userList[j].user_id,
      });
      // add message to userListObjcet
      userList[j].phone_number = userWallet.user_phone_number;
      userList[j].email = userWalle.user_email;
      if (
        await checkBalance(
          userList[j].amount,
          Number(userWallet.available_balance)
        )
      ) {
        userList[j].message === "Success";
      } else {
        userList[j].message === "Wallet Has Insufficient Balance";
      }
    }
    //  extract phone number and email
    for (let m = 0; m < userList.length; m++) {
      userNotificationdata.push({
        userEmail: userList[m].email,
        userPhoneNumber: userList[m].phone_number,
        message: userList[m].message,
      });
    }
    //  publish To Notification Queue
    const publishToNotifcationQueue = await new publishInAppNotification(
      "sms",
      userNotificationdata
    );
  });

  // // weekly cron
  // cron.schedule("* * * * *", async () => {
  //   // get scheduled time from users plan
  // });

  // // monthly cron
  // cron.schedule("* * * * *", async () => {
  // });
};
