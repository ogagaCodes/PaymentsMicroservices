const { Connnection } = require('../index');
const  KEYS  = require('../../_config/keys'); 
const UserService = require('../../app/modules/user/service/user.services');

const CreateUserConsumer = new Connnection(KEYS.AMQP_URI, KEYS.CREATE_USER_QUEUE,
  async (msg) => {
    const channel = await CreateUserConsumer.getChannel();
    if (msg !== null) {
      const message = msg.content.toString();
      console.info(` [x] Consumed : ${message}`);

      const {
        bodyData
      } = JSON.parse(message);

      try {
    //   create wallet here
    const newUser = await new UserService().createUser(bodyData);
    // publish to notifcation 
        return channel.ack(msg);
      } catch (error) {
        console.error(`Error while creating user: ${error}`);
        return channel.ack(msg);
      }
    }
    process.on('exit', (code) => {
      channel.close();
      console.log(`Closing ${channel} channel`);
   });
    return null;
  });

  module.exports = CreateUserConsumer;
