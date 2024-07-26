const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      trim: true,
      enum: ["deposit", "withdrawal"],
    },
    amount: {
      type: Number,
      default: 0,
    },
    status: {
      type: Number,
      default: 2, //0-Incomplete, 1-completed, 2-pending
    },
    alertedAdmin: {
      type: Boolean,
      default: false,
    },
    alertedClient: {
      type: Boolean,
      default: false,
    },
    credited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

exports.Transaction = mongoose.model("Transaction", TransactionSchema);
