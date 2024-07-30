const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { Transaction } = require("../models/transaction");

require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.SARTCASH_MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  const existingUsers = await User.find({}, "_id");
  const userIDs = existingUsers.map((user) => user._id);
  const types = ["deposit", "withdrawal"];

  await Transaction.deleteMany({});

  for (let i = 0; i < 10; i++) {
    const randomUserID = userIDs[Math.floor(Math.random() * userIDs.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];

    await Transaction.create({
      user: randomUserID,
      amount: faker.number.float({
        min: 0,
        max: 1893,
        multipleOf: 0.02,
      }),
      type: randomType,
      status: faker.number.int({ min: 0, max: 3 }),
      credited: faker.datatype.boolean(),
    });

    console.log("---Created---");
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
