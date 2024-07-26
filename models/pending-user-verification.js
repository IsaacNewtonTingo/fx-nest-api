const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PendingUserVerificationSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    verificationCode: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

PendingUserVerificationSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 600 }
);

exports.PendingUserVerification = mongoose.model(
  "PendingUserVerification",
  PendingUserVerificationSchema
);
