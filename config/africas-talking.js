const credentials = {
  apiKey:
    process.env.ENV == "DEV"
      ? process.env.AFRICAS_TALKING_PROD_API_KEY
      : process.env.AFRICAS_TALKING_PROD_API_KEY,
  username:
    process.env.ENV == "DEV"
      ? process.env.AFRICAS_TALKING_PROD_USER_NAME
      : process.env.AFRICAS_TALKING_PROD_USER_NAME,
};

exports.AfricasTalking = require("africastalking")(credentials);
