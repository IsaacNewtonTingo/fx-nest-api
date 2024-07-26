const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      default: "user_" + Math.floor(100000 + Math.random() * 900000).toString(),
    },
    phoneNumber: {
      type: Number,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    roleID: {
      type: String,
      default: "regularUser",
      enum: [
        "superAdmin",
        "admin",
        "blogAdmin",
        "blogger",
        "regularUser",
        "shopAdmin",
        "shopEditor",
        "promoAdmin",
      ],
    },
    password: { type: String, default: null },
    googleUserID: { type: String, default: null },
    status: {
      type: Number,
      default: 3, //0-deleted 1-inactive 2-pending 3-active
    },
    premium: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PremiumUser",
      default: null,
    },
    verified: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VerifiedUser",
      default: null,
    },
    followers: {
      type: Array,
      default: [],
    },
    locationName: {
      type: String,
      default: null,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [null, null],
      },
    },
    privacy: [
      {
        aspect: {
          type: String,
          enum: ["Message", "Posts", "Profile", "Comment", "Events"],
          required: true,
        },
        setting: {
          type: String,
          enum: [
            "Public",
            "Followers",
            "Following",
            "Following each other",
            "Private",
          ],
          default: "Public",
        },
      },
    ],
    acceptedTerms: {
      type: Boolean,
      default: true,
    },
    emailMarketing: {
      type: Boolean,
      default: true,
    },
    loginMethod: {
      type: String,
      default: "emailPassword",
      enum: ["google", "emailPassword"],
    },
    channel: {
      type: String,
      enum: ["customJerseysWeb", "customJerseysMobile"],
    },
    subscribedToNewsletter: {
      type: Boolean,
      default: true,
    },
    accountBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", UserSchema);
