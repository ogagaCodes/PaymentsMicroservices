const { sendMail } = require("./mail")
const { sendPushNotification } = require("./pushNotifications")
const { sendSMS } = require("./sms")

exports.helpers = {
    sendSMS,
    sendMail,
    sendPushNotification
}