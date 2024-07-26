const mongoose = require("mongoose");
const { Product } = require("../models/products");
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

const updateProducts = async () => {
  //get products and update them
  const products = await Product.find({});
  for (const product of products) {
    const teamID = product.team;
    const team = await Team.findOne({ _id: teamID });
    const leagueID = team.league;
    const updated = await product.updateOne(
      { league: leagueID },
      { new: true }
    );

    console.log(updated);
  }
};

updateProducts().then(() => {
  mongoose.connection.close();
});
