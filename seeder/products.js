const mongoose = require("mongoose");
const { Product } = require("../models/products");
const { faker } = require("@faker-js/faker");

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
  await Product.deleteMany({});

  for (let i = 0; i < 50; i++) {
    await Product.create({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      slug: faker.lorem.slug({ min: 3, max: 10 }),
      price: faker.commerce.price({ min: "1000", max: "2000" }),
      images: [
        faker.image.urlLoremFlickr({ category: "fashion" }),
        faker.image.urlLoremFlickr({ category: "fashion" }),
        faker.image.urlLoremFlickr({ category: "fashion" }),
        faker.image.urlLoremFlickr({ category: "fashion" }),
        faker.image.urlLoremFlickr({ category: "fashion" }),
      ],
      colors: ["Black", "White", "Cream"],
      sizes: ["2XL", "XL", "L", "M", "S", "XS"],
    });
    console.log("Product seeded");
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
