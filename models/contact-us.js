const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactUsSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

exports.ContactUs = mongoose.model("ContactUs", contactUsSchema);
