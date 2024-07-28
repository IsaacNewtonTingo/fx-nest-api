const { Transaction } = require("../models/transaction");
const { User } = require("../models/user");

exports.withdraw = async (req, res) => {
  try {
    const { amount, userID } = req.body;
    if (!userID) {
      res.json({
        status: "Failed",
        message: "User ID is required",
      });
    } else if (!amount) {
      res.json({
        status: "Failed",
        message: "Amount is required",
      });
    } else {
      const user = await User.findOne({ _id: userID });
      if (user) {
        const accountBalance = user.accountBalance;
        if (accountBalance < amount) {
          res.json({
            status: "Failed",
            message: "Insufficient funds",
          });
        } else {
          /**
           * deduct and update
           * alert admin on email
           * alert user that they have made a withdrawal request
           * add notification to the portal for admin
           * add notif to user
           *
           * Alerts are done by a cron job
           * */

          const different = accountBalance - amount;
          const data = await user.updateOne(
            { accountBalance: different },
            { new: true }
          );

          res.json({
            status: "Success",
            message:
              "Withdrawal request has been received and is being processed",
            data,
          });
        }
      } else {
        res.json({
          status: "Failed",
          message: "User not found",
        });
      }
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while withdrawing",
    });
  }
};

exports.fund = async (req, res) => {
  try {
    const { type, amount, userID } = req.body;
    const response = await Transaction.create({
      user: userID,
      type,
      amount,
    });

    ``;
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while funcding account",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const userID = req.params.id;
    const data = await Transaction.find({ user: userID });

    res.json({
      status: "Success",
      message: "Transactions retrieved successfully",
      data,
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while getting transactions",
    });
  }
};
