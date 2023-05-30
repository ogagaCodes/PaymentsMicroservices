const KEYS = require("../../_config/keys");
const accountSid = KEYS.twilioSID;
const authToken = KEYS.twilioToken;
// const client = require("twilio")(accountSid, authToken);

exports.sendSmsTwilio = async (data) => {
  try {
       if (data.receiver.startsWith("0")) {
        data.receiver = data.receiver.substring(0, 0) + "+234" + data.receiver.substring(0 + 1);
      }
    const result = await client.messages
      .create({
        body: data.message,
        from: '+14438883037',
        to: data.receiver,
      });
      console.log(result.sid);
      return {
          error: false,
          message:"messages sent successfully",
          data: result
      };
  } catch (error) {
    console.log(error);
    return {
        error: true,
        message: "Internal Server Error",
        data: null
    }
  }
};