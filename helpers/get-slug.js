const { Product } = require("../models/products");

async function getSlug(name) {
  let slug = name.toLowerCase().replace(/\s+/g, "-");
  slug = slug.replace(/[^\w-]+/g, "");

  const existing = await Product.findOne({ slug });
  if (existing) {
    const rndm = Math.floor(100000 + Math.random() * 900000).toString();
    return slug + "-" + rndm;
  } else {
    return slug;
  }
}
module.exports = {
  getSlug,
};
