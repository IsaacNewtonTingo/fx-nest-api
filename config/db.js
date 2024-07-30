const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnection() {
  mongoose.set("strictQuery", false);

  await mongoose
    .connect(process.env.SMARTCASH_MONGO_URI)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  dbConnection,
};
