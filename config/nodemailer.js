const nodemailer = require("nodemailer");
require("dotenv").config();

exports.transporter = nodemailer.createTransport({
  host:
    process.env.ENV == "DEV"
      ? process.env.DEV_MAIL_HOST
      : process.env.PROD_MAIL_HOST,
  port:
    process.env.ENV == "DEV"
      ? process.env.DEV_MAIL_PORT
      : process.env.PROD_MAIL_PORT,
  secure: true,
  auth: {
    user:
      process.env.ENV == "DEV"
        ? process.env.DEV_MAIL_USERNAME
        : process.env.PROD_MAIL_USERNAME,
    pass:
      process.env.ENV == "DEV"
        ? process.env.DEV_MAIL_PASSWORD
        : process.env.PROD_MAIL_PASSWORD,
  },
});
