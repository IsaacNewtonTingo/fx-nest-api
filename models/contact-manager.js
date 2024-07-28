const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactManagerSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

exports.ContactManager = mongoose.model("ContactManager", ContactManagerSchema);
