const mongoose = require("mongoose");
const app = require("./src");
const KEYS = require("./src/_config/keys");
const logger = require("./logger.conf");
const CreateUserQueue = require("./src/_queue/consumers/createuser.consumer");

mongoose.set("strictQuery", true);
mongoose
  .connect(KEYS.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info(`User Service Database Connected......`);
    const PORT = process.env.PORT || 7003;
    const server = app.listen(PORT, () => {
      logger.info(`User Service has started!... and running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

  CreateUserQueue.consume("CREATE USER Consumer Running...")