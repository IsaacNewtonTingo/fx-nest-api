const { ContactManager } = require("../models/contact-manager");
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
    const { userID, limit = 20, page = 0, type } = req.query;

    let query = {};
    if (type) {
      query.type = type;
    }
    if (userID) {
      query.user = userID;
    }

    const data = await Transaction.find(query)
      .skip(parseInt(limit) * parseInt(page))
      .limit(limit)
      .sort({ createdAt: -1 });

    const result = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const total = result.length > 0 ? result[0].totalAmount : 0;

    const count = await Transaction.countDocuments();
    const withdrawals = await Transaction.countDocuments({
      type: "withdrawal",
    });
    const deposits = await Transaction.countDocuments({ type: "deposit" });

    res.json({
      status: "Success",
      message: "Transactions retrieved successfully",
      data: {
        total,
        data,
        count,
        withdrawals,
        deposits,
      },
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while getting transactions",
    });
  }
};

exports.contactManager = async (req, res) => {
  try {
    const { userID, amount } = req.body;
    const data = await ContactManager.create({
      user: userID,
      amount,
    });

    res.json({
      status: "Success",
      message: "Request submitted successfully",
      data,
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while funcding account",
    });
  }
};
