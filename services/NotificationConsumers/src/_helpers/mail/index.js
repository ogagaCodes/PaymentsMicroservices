const fs = require("fs");
const ejs = require("ejs");
const {
  sendSingleMail,
} = require("./zeptomail/sendSingleMail");
const { filePaths } = require("../../_assets/index");
exports.sendFailedDepositMail = async (bodyData) => {
    try {
        // bodydata must conain email
      const template = fs.readFileSync(process.cwd() + filePaths.FailedDepositMail, {
        encoding: "utf-8",
      });
      const Data = {
        message: bodyData.message
      };
  
      const html = ejs.render(template, Data);
      bodyData.html = html;
      bodyData.subject = "Failed Deposit";
      const mailResponse = await sendSingleMail(bodyData);
      console.log("ZEPTO MAIL RESPONSE", mailResponse)
        return {
          error: false,
          message: "Mail Sent",
          data: null,
        };
      // }
    } catch (err) {
      console.log(err);
      return {
        error: true,
        message: "Error sending mail",
        data: err,
      };
    }
  };