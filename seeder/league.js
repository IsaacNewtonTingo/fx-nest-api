const mongoose = require("mongoose");
const { League } = require("../models/league");

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
      name: "Other",
      slug: "other",
      country: "666fd73393636375162273a0",
    },
  ];
  await League.insertMany(data);

  console.log("Leagues seeded successfully");
};
seedDB().then(() => {
  mongoose.connection.close();
});
