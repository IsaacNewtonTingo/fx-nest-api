const mongoose = require("mongoose");
const { Team } = require("../models/team");

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
  const data = [
    {
      name: "Argentina",
      slug: "argentina",
      image:
        "https://festinekt.s3.amazonaws.com/0227e40eabdbca2a709fd20386e34de6ea1026d38ba6775f2db68a4eefbfbc9f",
      league: "665389a08ee1b364b8538d1f",
    },
  ];
  await Team.insertMany(data);

  console.log("Teams seeded successfully");
};
seedDB().then(() => {
  mongoose.connection.close();
});
