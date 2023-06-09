const mongoose = require("mongoose");
const app = require("./src");
const KEYS = require("./src/_config/keys");
const logger = require("./logger.conf");
const CreateWalletConsumer = require("./src/_queue/consumers/createWallet.consumers");
const UpdateWalletConsumer = require("./src/_queue/consumers/walletUpdateConsumers");

const { startCron } = require("./src/_helpers/cron/autoDailyDeposit")

mongoose.set("strictQuery", true);
mongoose
  .connect(KEYS.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info(`Wallets Service Database Connected......`);
    const PORT = process.env.PORT || 7004;
    const server = app.listen(PORT, () => {
      logger.info(`Wallets Service has started!... and running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

  startCron();
CreateWalletConsumer.consume("CREATE WALLET consumer running ...")
UpdateWalletConsumer.consume("UPDate WALLET consumer running ...")
