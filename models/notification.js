const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      trim: true,
    },
    decription: {
      type: String,
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
    transaction: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
      default: null,
    },
  },
  { timestamps: true }
);

exports.Notification = mongoose.model("Notification", NotificationSchema);
