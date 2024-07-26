const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

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
  const password = "@Icui4cu1998";
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

  // await User.deleteMany({});

  for (let i = 0; i < 1; i++) {
    await User.create({
      firstName: "Isaac",
      lastName: "Tingo",
      email: "newtontingo@gmail.com",
      username: "isaactingo",
      profilePicture: faker.image.avatar(),
      phoneNumber: "254724753175",
      password: encryptedPassword,
      privacy,
      channel: "customJerseysWeb",
      subscribedToNewsletter: true,
      roleID: "superAdmin",
    });
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
