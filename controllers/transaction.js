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
    const { user, limit = 20, page = 0, type } = req.query;

    let query = {};
    if (type) {
      query.type = type;
    }
    if (user) {
      query.user = user;
    }

    const data = await Transaction.find(query)
      .skip(parseInt(limit) * parseInt(page))
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "firstName lastName email phoneNumber",
      });

    const result = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const total = result.length > 0 ? result[0].totalAmount : 0;

    const count = await Transaction.countDocuments(query);
    const withdrawals = await Transaction.countDocuments(query);
    const deposits = await Transaction.countDocuments(query);

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

exports.getAdminTransactions = async (req, res) => {
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
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "firstName lastName email phoneNumber",
      });

    const result = await Transaction.aggregate([
      { $match: query },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);

    const total = result.length > 0 ? result[0].totalAmount : 0;

    const count = await Transaction.countDocuments();
    const withdrawalCount = await Transaction.countDocuments({
      type: "withdrawal",
    });
    const depositCount = await Transaction.countDocuments({ type: "deposit" });

    //------------------------------------------
    let withQuery = {};
    withQuery.type = "withdrawal";
    const withRes = await Transaction.aggregate([
      { $match: withQuery },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);
    const withdrawalAmount = withRes.length > 0 ? withRes[0].totalAmount : 0;

    //------------------------------------------
    let depQuery = {};
    depQuery.type = "deposit";
    const depRes = await Transaction.aggregate([
      { $match: depQuery },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);
    const depositAmount = depRes.length > 0 ? depRes[0].totalAmount : 0;

    //------------------------------------------
    let userQuery = {};
    const userRes = await User.aggregate([
      { $match: userQuery },
      { $group: { _id: null, totalAmount: { $sum: "$accountBalance" } } },
    ]);
    const balance = withRes.length > 0 ? userRes[0].totalAmount : 0;

    res.json({
      status: "Success",
      message: "Transactions retrieved successfully",
      data: {
        balance,
        total,
        data,
        count,
        withdrawals: {
          count: withdrawalCount,
          amount: withdrawalAmount,
        },
        deposits: {
          count: depositCount,
          amount: depositAmount,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Failed",
      message: "An error occured while getting transactions",
    });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { amount, userID } = req.body;
    const user = await User.findOne({ _id: userID });
    const balance = user.accountBalance;

    if (balance > amount) {
      await Transaction.create({
        user: userID,
        type: "withdrawal",
        amount,
      });

      const newBalance = balance - amount;
      await user.updateOne({ accountBalance: newBalance });

      res.json({
        status: "Success",
        message: "Withdrawal request sent",
      });
    } else {
      res.json({
        status: "Failed",
        message: "Insufficient funds",
      });
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while withdrawing",
    });
  }
};
