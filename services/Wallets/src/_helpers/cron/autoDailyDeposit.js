const cron = require("node-cron");
const { checkBalance } = require("../../_helpers/wallet/checkBalance");
const WalletService = require("../../../src/app/modules/wallets/services/wallet.services");
const SavingsPlanService = require("../../app/modules/savingsPlan/services/savingsPlan.sevices");
const { types } = require("../../_constants/type");
const {
  publishInAppNotification,
} = require("../../_queue/publishers/inAppNotification.publishers");

exports.startCron = async () => {
  // daily cron [For demonstartion purposes]
  return cron.schedule("* * * * *", async () => {
    // store user ids/success/failure
    try {
      let userList = [];
      let userNotificationdata = [];
      let userWallet;
      let isSufficientBalance;
      console.log("Daily Cron Satrted....");
      const AllSavingsPlan = await new SavingsPlanService().all({
        auto_deposit: "daily",
      });
      console.log("ALL SAVINGS PLAN ===== ", AllSavingsPlan);
      // get scheduled amount users plan
      console.log(
        "ALL SAVINGS PLAN DATA ===== ",
        AllSavingsPlan.data.length > 0
      );
      for (let i = 0; i < AllSavingsPlan.data.length; i++) {
        //  push user id and user amount scheduled into user ids/success/failure
        userList.push({
          user_id: AllSavingsPlan.data[i].user_id,
          amount: AllSavingsPlan.data[i].amount,
        });
        console.log("USER LIST", userList);
      }
      //  get users wallet balance form wallet service
      for (let j = 0; j < userList.length; j++) {
        // search for balance and attach to userList
        userWallet = await new WalletService().findWallet({
          user_id: userList[j].user_id,
        });
        // add message to userListObjcet
        console.log("USER WALLET ===== ", userWallet);
        userList[j].phone_number = userWallet.user_phone_number;
        userList[j].email = userWallet.user_email;
        console.log("USERLIst After ======= ", userList);
        console.log("Deposit Amount ======= ", userList[j].amount);
        console.log("Wallet Balance ======= ", userWallet.available_balance);
         isSufficientBalance = await checkBalance(
          userList[j].amount,
          userWallet.available_balance
        );
        console.log("IS SUFFICIENT ====== ", isSufficientBalance);
      }
      //  extract phone number and email
      for (let m = 0; m < userList.length; m++) {
        userNotificationdata.push({
          userEmail: userList[m].email,
          userPhoneNumber: userList[m].phone_number,
          message: !isSufficientBalance ? "Success" : "Wallet Has Insufficient Balance",
        });
      }
      console.log("NOTIFICATION DATA ==== ", userNotificationdata);
      //  publish To Notification Queue
      const publishToNotifcationQueue = await publishInAppNotification(
        types.type,
        userNotificationdata
      );
      // reset user List
      userList = [];
      console.log("RESET USER LIST =======  ", userList);
    } catch (error) {
      console.error(error);
    }
  });

  // // weekly cron
  // cron.schedule("* * * * *", async () => {
  //   // get scheduled time from users plan
  // });

  // // monthly cron
  // cron.schedule("* * * * *", async () => {
  // });
};
