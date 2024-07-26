const { v4: uuidv4 } = require("uuid");
const request = require("request");
const { Order } = require("../models/order");
const { OrderItem } = require("../models/order-items");
const { Payment } = require("../models/payment");
const { User } = require("../models/user");

exports.makePayment = async (req, res) => {
  let { phoneNumber, amount, order, userID, shippingAddress, promoCode } =
    req.body;
  amount = process.env.ENV === "DEV" ? 1 : amount;

  try {
    const url = process.env.TINYPESA_STK_ENDPOINT;
    const accountNumber = "CJKE-" + uuidv4();
    const body = `amount=${amount}&msisdn=${parseInt(
      phoneNumber
    )}&account_no=${accountNumber}`;
    const headers = {
      Apikey:
        process.env.ENV == "DEV"
          ? process.env.TINY_PESA_DEV_API_KEY
          : process.env.TINY_PESA_PROD_API_KEY,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    request(
      {
        url: url,
        method: "POST",
        headers,
        body,
      },
      async function (error, request, body) {
        if (error) {
          res.json({
            status: "Failed",
            message: error.message,
          });
        } else {
          const jsonBody = JSON.parse(body);
          if (jsonBody.success == true) {
            const newOrder = await Order.create({
              user: userID,
              referenceNumber: accountNumber,
              phoneNumber,
              amount,
              shippingAddress,
              promoCode,
            });

            for (const item of order) {
              await OrderItem.create({
                user: userID,
                order: newOrder._id,
                product: item.product._id,
                amount: item.amount,
                quantity: item.quantity,
                color: item.color,
                size: item.size,
                promoCode,
              });
            }

            await Payment.create({
              user: userID,
              order: newOrder._id,
              referenceNumber: accountNumber,
              phoneNumber,
              amount,
            });

            await User.findOneAndUpdate({ _id: userID }, { phoneNumber });

            paymentStatus(userID, accountNumber, amount, phoneNumber, res);
          } else {
            res.json({
              status: "Failed",
              message: "An error occured while initiating payment",
            });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while making payment",
    });
  }
};

const paymentStatus = async (
  userID,
  accountNumber,
  amount,
  phoneNumber,
  res
) => {
  let complete = 0;
  let responseSent = false;

  const interval = setInterval(() => {
    console.log("----Checking payment-----");

    if (complete !== 1 && !responseSent) {
      request(
        {
          url: `${process.env.TINYPESA_PAYMENT_CHECK_ENDPOINT}/${accountNumber}`,
          method: "GET",
          headers: {
            Apikey:
              process.env.ENV == "DEV"
                ? process.env.TINY_PESA_DEV_API_KEY
                : process.env.TINY_PESA_PROD_API_KEY,
            Accept: "application/json",
          },
        },
        async function (error, request, body) {
          if (error) {
            res.json({
              status: "Failed",
              message: "An error occured while checking payment status",
            });
          } else {
            const newBody = JSON.parse(body);
            complete = newBody.is_complete;

            if (complete == 1 && !responseSent) {
              clearInterval(interval);
              clearTimeout(timeOut);
              responseSent = true;

              const order = await Order.findOneAndUpdate(
                {
                  referenceNumber: accountNumber,
                },
                { status: 1 },
                { new: true }
              );

              await OrderItem.updateMany(
                {
                  order: order._id,
                },
                { status: 1 }
              );

              await Payment.updateMany(
                {
                  referenceNumber: accountNumber,
                },
                { status: 1 }
              );

              const orderItems = await OrderItem.find({ order: order._id });

              res.json({
                status: "Success",
                message: "Your payment was processed successfully",
                data: {
                  order,
                  orderItems,
                },
              });
            }
          }
        }
      );
    }
  }, 1000);

  const timeOut = setTimeout(() => {
    clearInterval(interval);

    res.json({
      status: "Failed",
      message:
        "You did not complete the payment process. Please make sure you are next to your phone and make the payment",
    });
  }, 60000);
};
