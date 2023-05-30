const { SendMailClient } = require("zeptomail");
const KEYS = require("../../../_config/keys");
const ZEPTO_URL = KEYS.ZEPTO_MAIL_URI;
const ZEPTO_MAIL_TOKEN = KEYS.ZEPTO_MAIL_TOKEN

let client = new SendMailClient({url:ZEPTO_URL, token:ZEPTO_MAIL_TOKEN});

exports.sendSingleMail = async (data) => {
  try {
    client.sendMail({
      "bounce_address": KEYS.BOUNCE_ADDRESS,
      "from": 
      {
          "address": `noreply@${KEYS.VERIFIED_DOMAIN}`,
          "name": "PaymentTest"
      },
      "to": 
      [
          {
          "email_address": 
              {
                  "address": data.email,
                  "name": data.name ? data.name : "Payment Test"
              }
          }
      ],
      "subject": data.subject,
      "htmlbody": data.html,
      "track_clicks": true,
      "track_opens": true,
  }).then((resp) => {
    console.log("success");
    return {
      error: false,
      data:resp
    }
  }).catch((error) => {
    console.error("Zepto mail error =========================", error);
});
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "Error Sending mail",
      data: error
    };
  }
};

