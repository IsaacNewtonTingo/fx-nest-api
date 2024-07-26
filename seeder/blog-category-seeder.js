const mongoose = require("mongoose");
const { BlogCategory } = require("../models/blog/categories");

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
  await BlogCategory.deleteMany({});

  const blogCategories = [
    {
      name: "Sports",
      image:
        "https://plus.unsplash.com/premium_photo-1676634832558-6654a134e920?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHNwb3J0c3xlbnwwfHwwfHx8MA%3D%3D",
      slug: "sports",
      icon: `<svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm143 304h-45.22a8 8 0 01-6.91-4l-16.14-27.68a8 8 0 01-.86-6l14.86-59.92a8 8 0 014.65-5.45l28.1-11.9a8 8 0 018.34 1.3l41.63 35.82a8 8 0 012.69 7.26 174.75 174.75 0 01-24.28 66.68A8 8 0 01399 352zM134.52 237.13l28.1 11.9a8 8 0 014.65 5.45l14.86 59.92a8 8 0 01-.86 6L165.13 348a8 8 0 01-6.91 4H113a8 8 0 01-6.82-3.81 174.75 174.75 0 01-24.28-66.68 8 8 0 012.69-7.26l41.63-35.82a8 8 0 018.3-1.3zm256.94-87.24l-18.07 51.38A8 8 0 01369 206l-29.58 12.53a8 8 0 01-8.26-1.24L274.9 170.1a8 8 0 01-2.9-6.1v-33.58a8 8 0 013.56-6.65l42.83-28.54a8 8 0 017.66-.67A176.92 176.92 0 01390 142a8 8 0 011.46 7.89zM193.6 95.23l42.84 28.54a8 8 0 013.56 6.65V164a8 8 0 01-2.86 6.13l-56.26 47.19a8 8 0 01-8.26 1.24L143 206a8 8 0 01-4.43-4.72L120.5 149.9a8 8 0 011.5-7.9 176.92 176.92 0 0164-47.48 8 8 0 017.6.71zm17.31 327.46L191.18 373a8 8 0 01.52-7l15.17-26a8 8 0 016.91-4h84.44a8 8 0 016.91 4l15.18 26a8 8 0 01.53 7l-19.59 49.67a8 8 0 01-5.69 4.87 176.58 176.58 0 01-79 0 8 8 0 01-5.65-4.85z" />
    </svg>`,
      description:
        "Explore the world of sports and fitness with festinekt, your ultimate online destination. Dive into expert analysis, athlete interviews, and workout routines tailored for enthusiasts of all levels. Whether you're a dedicated athlete or just starting your fitness journey, find inspiration and tips to elevate your game. Join our community and embrace the thrill of sports and fitness with festinekt today!",
    },
    {
      name: "Entertainment",
      image:
        "https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGVudGVydGFpbm1lbnR8ZW58MHx8MHx8fDA%3D",
      slug: "entertainment",
      icon: `<svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M14 3.5c0 .83-.67 1.5-1.5 1.5S11 4.33 11 3.5 11.67 2 12.5 2s1.5.67 1.5 1.5M8.5 5C7.67 5 7 5.67 7 6.5S7.67 8 8.5 8 10 7.33 10 6.5 9.33 5 8.5 5m5.5 7l-.78-2.25h2.96l2.16-1.08c.37-.17.52-.63.33-1a.737.737 0 00-1-.34l-.82.41-.49-.84c-.29-.65-1-1.02-1.7-.86l-2.47.53c-.69.15-1.19.78-1.19 1.5v.7l-2.43 1.62h.01c-.08.07-.19.16-.25.28l-.89 1.77-1.78.89c-.37.17-.52.64-.33 1.01a.753.753 0 001.01.33l2.22-1.11L9.6 11.5 11 13c-1 3-8 7-8 7s4 2 9 2 9-2 9-2-5-4-7-8m2.85-.91l-.32.16h-1.2l.06.16c.52 1.03 1.28 2.09 2.11 3.03l-.53-3.41-.12.06z" />
    </svg>`,
      description:
        "Dive into the world of entertainment with festinekt, your premier destination for all things entertainment. From movie reviews to celebrity gossip, music releases to gaming updates, we've got you covered. Discover the latest trends, behind-the-scenes stories, and exclusive interviews with your favorite stars. Join our vibrant community of entertainment enthusiasts and stay entertained with festinekt!",
    },
    {
      name: "Technology",
      image:
        "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM2fHx0ZWNobm9sb2d5fGVufDB8fDB8fHww",
      slug: "technology",
      icon: `<svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M23 11h-5a1 1 0 00-1 1v9a1 1 0 001 1h5a1 1 0 001-1v-9a1 1 0 00-1-1m0 9h-5v-7h5v7M20 2H2C.89 2 0 2.89 0 4v12a2 2 0 002 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4a2 2 0 00-2-2m-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z" />
    </svg>`,
      description:
        "Stay ahead in the dynamic world of technology with festinekt. From gadget reviews to software updates, tech news to innovation insights, we bring you the latest trends and breakthroughs. Dive into expert analyses, how-to guides, and thought-provoking discussions on all things tech. Join our community of tech enthusiasts and explore the future with festinekt!",
    },
    {
      name: "Health and Wellness",
      image:
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGVhbHRofGVufDB8fDB8fHww",
      slug: "health-and-wellness",
      icon: `<svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M11 2a8.002 8.002 0 017.934 6.965l2.25 3.539c.148.233.118.58-.225.728L19 14.07V17a2 2 0 01-2 2h-1.999L15 22H6v-3.694c0-1.18-.436-2.297-1.244-3.305A8 8 0 0111 2zm-.53 5.763a1.75 1.75 0 10-2.475 2.474L11 13.243l3.005-3.006a1.75 1.75 0 10-2.475-2.474l-.53.53-.53-.53z" />
    </svg>`,
      description:
        "Prioritize your well-being with festinekt, your trusted source for all things health and wellness. Explore articles on fitness routines, nutrition tips, mental health insights, and holistic living. From expert advice to personal stories, we're here to support your journey to a healthier, happier life. Join our community and discover the power of wellness with festinekt!",
    },
    {
      name: "Food and Cooking",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D",
      slug: "food-and-cooking",
      icon: `<svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M384 352H184.36l-41 35-41-35H16v24c0 30.59 21.13 55.51 47.26 56 2.43 15.12 8.31 28.78 17.16 39.47C93.51 487.28 112.54 496 134 496h132c21.46 0 40.49-8.72 53.58-24.55 8.85-10.69 14.73-24.35 17.16-39.47 13.88-.25 26.35-7.4 35-18.63A61.26 61.26 0 00384 376zM105 320l38.33 28.19L182 320h202v-8a40.07 40.07 0 00-32-39.2c-.82-29.69-13-54.54-35.51-72C295.67 184.56 267.85 176 236 176h-72c-68.22 0-114.43 38.77-116 96.8A40.07 40.07 0 0016 312v8h89z" />
      <path d="M463.08 96h-74.59l8.92-35.66L442 45l-10-29-62 20-14.49 60H208v32h18.75l1.86 16H236c39 0 73.66 10.9 100.12 31.52A121.9 121.9 0 01371 218.07a124.16 124.16 0 0110.73 32.65 72 72 0 0127.89 90.9A96 96 0 01416 376c0 22.34-7.6 43.63-21.4 59.95a80 80 0 01-31.83 22.95 109.21 109.21 0 01-18.53 33c-1.18 1.42-2.39 2.81-3.63 4.15H416c16 0 23-8 25-23l36.4-345H496V96z" />
    </svg>`,
      description:
        "Indulge your culinary passions with festinekt, your ultimate destination for food and cooking enthusiasts. Explore mouthwatering recipes, cooking tips, restaurant reviews, and culinary adventures. From beginner-friendly dishes to gourmet creations, we've got something for every palate. Join our community and embark on a delicious journey with festinekt!",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1559697242-a465f2578a95?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHxmYXNoaW9ufGVufDB8fDB8fHww",
      slug: "fashion",
      icon: `<svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M256 96c33.08 0 60.71-25.78 64-58 .3-3-3-6-6-6a13 13 0 00-4.74.9c-.2.08-21.1 8.1-53.26 8.1s-53.1-8-53.26-8.1a16.21 16.21 0 00-5.3-.9h-.06a5.69 5.69 0 00-5.38 6c3.35 32.16 31 58 64 58z" />
      <path d="M485.29 89.9L356 44.64a4 4 0 00-5.27 3.16 96 96 0 01-189.38 0 4 4 0 00-5.35-3.16L26.71 89.9A16 16 0 0016.28 108l16.63 88a16 16 0 0013.92 12.9l48.88 5.52a8 8 0 017.1 8.19l-7.33 240.9a16 16 0 009.1 14.94A17.49 17.49 0 00112 480h288a17.49 17.49 0 007.42-1.55 16 16 0 009.1-14.94l-7.33-240.9a8 8 0 017.1-8.19l48.88-5.52a16 16 0 0013.92-12.9l16.63-88a16 16 0 00-10.43-18.1z" />
    </svg>`,
      description:
        "Elevate your style with festinekt, your premier destination for all things fashion. Discover the latest trends, fashion tips, styling advice, and insider insights from the world of haute couture to streetwear. From runway reviews to wardrobe essentials, we've got you covered. Join our community of fashion enthusiasts and express your unique style with festinekt!",
    },
    {
      name: "Arts and Culture",
      image:
        "https://images.unsplash.com/photo-1515658323406-25d61c141a6e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3VsdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
      slug: "arts-and-culture",
      icon: `<svg
      viewBox="0 0 640 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M335.5 4l288 160c15.4 8.6 21 28.1 12.4 43.5s-28.1 21-43.5 12.4L320 68.6 47.5 220c-15.4 8.6-34.9 3-43.5-12.4s-3-34.9 12.4-43.5L304.5 4c9.7-5.4 21.4-5.4 31.1 0zM320 240c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm-176 96c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm392-40c0 22.1-17.9 40-40 40s-40-17.9-40-40 17.9-40 40-40 40 17.9 40 40zM226.9 491.4L200 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l37.9-70.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c16.3 0 31.9 4.5 45.4 12.6l33.6-62.3c15.3-28.5 45.1-46.3 77.5-46.3h19.5c32.4 0 62.1 17.8 77.5 46.3l33.6 62.3c13.5-8.1 29.1-12.6 45.4-12.6h19.5c32.4 0 62.1 17.8 77.5 46.3l37.9 70.3c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8L552 441.5V480c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-38.5l-26.9 49.9c-6.3 11.7-20.8 16-32.5 9.8s-16-20.8-9.8-32.5l36.3-67.5c-1.7-1.7-3.2-3.6-4.3-5.8L376 345.5V400c0 17.7-14.3 32-32 32h-48c-17.7 0-32-14.3-32-32v-54.5l-26.9 49.9c-1.2 2.2-2.6 4.1-4.3 5.8l36.3 67.5c6.3 11.7 1.9 26.2-9.8 32.5s-26.2 1.9-32.5-9.8z" />
    </svg>`,
      description:
        "Dive into the rich tapestry of arts and culture with festinekt, your go-to source for inspiration and exploration. Explore literature, music, film, art exhibitions, theater performances, and cultural events. From in-depth critiques to behind-the-scenes stories, we celebrate the diversity and creativity of human expression. Join our community and embark on a journey of discovery with festinekt!",
    },
    {
      name: "Other",
      image:
        "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b3RoZXJ8ZW58MHx8MHx8fDA%3D",
      slug: "other",
      icon: `<svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M13 22C7.477 22 3 17.523 3 12S7.477 2 13 2s10 4.477 10 10-4.477 10-10 10zM8 11.5l4 1.5 1.5 4.002L17 8l-9 3.5z" />
    </svg>`,
      description:
        "Explore the eclectic mix of content in the 'Other' category on festinekt. From unique perspectives to unexpected discoveries, this category offers a diverse array of articles that defy categorization. Whether it's offbeat stories, quirky hobbies, or fascinating oddities, you're sure to find something intriguing and unexpected here. Join us as we venture into uncharted territory and embrace the spirit of curiosity with festinekt!",
    },
  ];
  await BlogCategory.insertMany(blogCategories);

  console.log("Categories seeded successfully");
};
seedDB().then(() => {
  mongoose.connection.close();
});
