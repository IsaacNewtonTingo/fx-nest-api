const { sendEmail } = require("../helpers/send-email");
const { ContactUs } = require("../models/contact-us");

exports.contactUs = async (req, res) => {
  try {
    const { name, email, phoneNumber, message } = req.body;
    if (!name) {
      res.json({
        status: "Failed",
        message: "Name is required",
      });
    } else if (!email) {
      res.json({
        status: "Failed",
        message: "Email is required",
      });
    } else if (!phoneNumber) {
      res.json({
        status: "Failed",
        message: "Phone number is required",
      });
    } else if (!message) {
      res.json({
        status: "Failed",
        message: "Message is required",
      });
    } else {
      await ContactUs.create({
        name,
        email,
        phoneNumber,
        message,
      });

      const subject = "Contact Form Submission";
      const msg = `
                    <p>Name: <strong>${name}</strong></p>
                    <p>Email: <strong>${email}</strong></p>
                    <p>Email: <strong>${phoneNumber}</strong></p>
                    <p>Message: <strong>${message}</strong></p>
                    `;

      const toEmails = ["info@festinekt.com", "newtontingo@gmail.com"];
      await sendEmail(toEmails, msg, subject);

      res.json({
        status: "Success",
        message: "Message sent successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while sending message",
    });
  }
};
