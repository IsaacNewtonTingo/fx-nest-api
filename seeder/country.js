const mongoose = require("mongoose");
const { Country } = require("../models/country");

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
    },
  ];
  await Country.insertMany(data);

  console.log("Countries seeded successfully");
};
seedDB().then(() => {
  mongoose.connection.close();
});
