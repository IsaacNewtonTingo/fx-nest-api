const { Plan } = require("../models/plan");
const { UserPlan } = require("../models/user-plan");

exports.createPlan = async (req, res) => {
  try {
    const { user, plan } = req.body;

    const existing = await Plan.findOne({ _id: plan });
    if (existing) {
      const time = existing.time;
      let expiryDate = new Date();

      switch (time) {
        case "6 Hours":
          expiryDate.setHours(expiryDate.getHours() + 6);
          break;
        case "12 Hours":
          expiryDate.setHours(expiryDate.getHours() + 12);
          break;
        case "2 Days":
          expiryDate.setDate(expiryDate.getDate() + 2);
          break;
        case "90 Days":
          expiryDate.setDate(expiryDate.getDate() + 90);
          break;
        default:
          break;
      }

      const data = await UserPlan.create({
        user,
        plan,
        expiryDate,
      });

      res.json({
        status: "Success",
        message: "Plan created successfully",
        data,
      });
    } else {
      res.json({
        status: "Failed",
        message: "Plan not found",
      });
    }
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occurred while creating the plan",
    });
  }
};

exports.getPlans = async (req, res) => {
  try {
    const data = await Plan.find({});

    res.json({
      status: "Success",
      message: "Plans retrieved successfully",
      data,
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while getting plans",
    });
  }
};

exports.getUserPlan = async (req, res) => {
  try {
    const { user } = req.query;
    const query = {};
    if (user) {
      query.user = user;
    }
    const data = await UserPlan.find(query).sort({ createdAt: -1 });

    res.json({
      status: "Success",
      message: "Plan retrieved successfully",
      data,
    });
  } catch (error) {
    res.json({
      status: "Failed",
      message: "An error occured while getting plan",
    });
  }
};
