const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlanSchema = new Schema(
  {
    name: {
      type: String,
    },
    amount: {
      type: Number,
    },
    time: {
      type: String,
    },
    status: {
      type: Number,
      default: 1, //0-Inactive, 1-Active,
    },
    benefits: {
      type: Array,
    },
  },
  { timestamps: true }
);

exports.Plan = mongoose.model("Plan", PlanSchema);
