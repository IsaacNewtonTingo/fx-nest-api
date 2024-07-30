const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { Plan } = require("../models/plan");

require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.SMARTCASH_MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  const packages = [
    {
      name: "2 INVESTMENT PLAN",
      amount: 100,
      time: "2 Hours",
      benefits: [
        "Invest $100 Earn $300 (Minimum)",
        "Invest $250 Earn $750",
        "Invest $300 Earn $900",
        "Invest $400 Earn $1,200",
        "Invest $500 Earn $1,500",
        "Invest $1,000 Earn $3,000",
        "Invest $2,000 Earn $6,000",
      ],
    },
    {
      name: "24 HOUR INVESTMENT PLAN",
      amount: 1000,
      time: "24 Hours",
      benefits: [
        "Invest $1,000 Earn $10.000 (Minimum)",
        "Invest $2,000 Earn $20,000",
        "Invest $3,000 Earn $30,000",
        "Invest $4,000 Earn $40,000",
        "Invest $5,000 Earn $50,000",
      ],
    },

  ];
  await Plan.deleteMany({})
  await Plan.insertMany(packages);
  console.log("Added");
};
seedDB().then(() => {
  mongoose.connection.close();
});
