var cron = require("node-cron");
const { Order } = require("../models/order");
const { sendEmail } = require("../helpers/send-email");
const { sendSMS } = require("../helpers/send-sms");
const { User } = require("../models/user");

exports.sendReceipt = () => {
  cron.schedule("* * * * *", async () => {
    console.log("------Cron job started------");
    try {
      const orders = await Order.find({
        $and: [{ receipted: 0 }, { status: 1 }],
      }).populate({
        path: "user",
        select: "firstName lastName email phoneNumber",
      });

      console.log(orders);

      if (orders.length > 0) {
        console.log("---Executing job---");
        for (const order of orders) {
          const message = `<p>
                            <strong>Hello ${order.user.firstName} ${order.user.lastName}</strong>,
                            <br/>
                            <br/>
                            This is a confirmation message that we have received your payment and your order <strong>${order.referenceNumber}</strong> has been successfully processed.
                            You will receive a call from our representatives on the delivery process. Incase you have any questions you can reach out to us 
                            at:
                            <br/>
                            <br/>
                            <strong>Email: customjerseyskenya@gmail.com</strong>
                            <br/>
                            <strong>Phone Call: +254742836404</strong>
                            <br/>
                            <strong>WhatsApp: +254742836404</strong>
                            <br/>
                            <strong>Instagram: @customjerseyskenya</strong>
                            <br/>
                            <strong>Twitter: @customjerseyske</strong>
                            <br/>
                            <strong>Facebook: @customjerseyskenya</strong>
                            <br/>
                            <br/>
                            <i>**This is an auto-generated email. Please don't reply to this message. 
                            For enquiries, contact our customer service team: 
                            <strong>customjerseyskenya@gmail.com</strong><i/>
                            </p>`;
          const subject = "Custom Jerseys Payment Confirmation";
          const email = order.user.email;

          try {
            await sendEmail(email, message, subject);

            await order.updateOne({ receipted: 1 });
            console.log(`Order ${order._id} updated successfully`);
          } catch (innerError) {
            console.error(`Error processing order ${order._id}:`, innerError);
          }
        }

        const roles = ["superAdmin", "admin", "shopAdmin"];
        const users = await User.find(
          { roleID: { $in: roles } },
          "phoneNumber email"
        );
        const phoneNumbers = users.map((user) => {
          return `+${user.phoneNumber}`;
        });
        const emails = users.map((user) => {
          return user.email;
        });

        const message = `A new purchase has been made on Custom Jerseys e-shop`;
        await sendSMS(phoneNumbers, message);

        const subject = "Custom Jerseys Order";
        await sendEmail(emails, message, subject);
      } else {
        console.log("----No pending unreceipted orders----");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  });
};
