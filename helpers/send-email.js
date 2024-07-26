const { transporter } = require("../config/nodemailer");

async function sendEmail(email, message, subject) {
  try {
    const mailOptions = {
      from: `FX Nest Investors ${
        process.env.ENV == "DEV"
          ? process.env.DEV_MAIL_USERNAME
          : process.env.PROD_MAIL_USERNAME
      }`,
      to: email,
      subject,
      html: message,
    };

    const response = await transporter.sendMail(mailOptions);
    return {
      data: response,
    };
  } catch (error) {
    return {
      error,
    };
  }
}

module.exports = {
  sendEmail,
};
