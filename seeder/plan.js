const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { Plan } = require("../models/plan");

require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  const packages = [
    {
      name: "Premium",
      amount: 10000,
      time: "6 Hours",
      benefits: [
        "Min. Possible deposit: $300",
        "Max. Possible deposit: $9999",
        "Minimum return 500%",
        "Maximum return 5000%",
        "$60 Gift Bonus",
      ],
    },
    {
      name: "Advanced (Recommended)",
      amount: 5000,
      time: "12 Hours",
      benefits: [
        "Min. Possible deposit: $100",
        "Max. Possible deposit: $4999",
        "Minimum return 50%",
        "Maximum return 1000%",
        "$42 Gift Bonus",
      ],
    },
    {
      name: "Standard",
      amount: 1000,
      time: "2 Days",
      benefits: [
        "Min. Possible deposit: $70",
        "Max. Possible deposit: $999",
        "Minimum return 12.5%",
        "Maximum return 600%",
        "$24 Gift Bonus",
      ],
    },
    {
      name: "Starter",
      amount: 100,
      time: "90 Days",
      benefits: [
        "Min. Possible deposit: $10",
        "Max. Possible deposit: $99",
        "Minimum return 5%",
        "Maximum return 98%",
        "$6 Gift Bonus",
      ],
    },
  ];
  await Plan.insertMany(packages);
  console.log("Added");
};
seedDB().then(() => {
  mongoose.connection.close();
});
