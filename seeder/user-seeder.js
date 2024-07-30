const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.FIRSTCOLTD_MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const seedDB = async () => {
  const password = "12345678@";
  const encryptedPassword = await bcrypt.hash(password, 0);
  const privacy = [
    {
      aspect: "Message",
      setting: "Public",
    },
    {
      aspect: "Posts",
      setting: "Public",
    },
    {
      aspect: "Profile",
      setting: "Public",
    },
    {
      aspect: "Comment",
      setting: "Public",
    },
  ];

  await User.deleteMany({});

  for (let i = 0; i < 16; i++) {
    await User.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: encryptedPassword,
      privacy,
      accountBalance: faker.number.float({
        min: 0,
        max: 1893,
        multipleOf: 0.02,
      }),
    });

    console.log("User created");
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
