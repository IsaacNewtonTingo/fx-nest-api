const { User } = require("../models/user");

exports.checkSuperAdmin = async (req, res, next) => {
  try {
    const { userID } = req.body;

    if (userID) {
      const user = await User.findOne({ _id: userID });
      if (user) {
        if (user.roleID === "superAdmin") {
          next();
        } else {
          res.json({
            status: "Failed",
            message: "You don't have permission to perform this operation",
          });
        }
      } else {
        res.json({
          status: "Failed",
          message: "User not found",
        });
      }
    } else {
      res.json({
        status: "Failed",
        message: "Please provide user id",
      });
    }
  } catch (error) {}
};
