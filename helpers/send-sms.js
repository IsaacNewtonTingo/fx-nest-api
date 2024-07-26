const { AfricasTalking } = require("../config/africas-talking");

async function sendSMS(phoneNumbers, message) {
  const sms = AfricasTalking.SMS;
  const options = {
    to: phoneNumbers,
    message: message,
    // from: "NIUZIE",
  };

  const response = await sms.send(options);
  return response;
}

module.exports = {
  sendSMS,
};
