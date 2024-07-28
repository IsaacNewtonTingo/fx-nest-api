const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserPlanSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: Number,
      default: 2, //0-Inactive, 1-Active, 2-pending
    },
    plan: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
    },
    expiryDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

exports.UserPlan = mongoose.model("UserPlan", UserPlanSchema);
