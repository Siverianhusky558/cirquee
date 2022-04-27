const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Post = require("../models/post");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Post.deleteMany({});
  for (let i = 0; i < 800; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const post = await new Post({
      author: "6134ce99dcf6862eec2dcd00",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem Ipsum dolor sit amet!",
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dgzorrtut/image/upload/v1630850965/YelpCamp/hxc5cisawvlm0whsmy4f.jpg",
          filename: "YelpCamp/hxc5cisawvlm0whsmy4f",
        },
        {
          url: "https://res.cloudinary.com/dgzorrtut/image/upload/v1630850961/YelpCamp/wy36tyzcrc36gtcrknmu.jpg",
          filename: "YelpCamp/wy36tyzcrc36gtcrknmu",
        },
        {
          url: "https://res.cloudinary.com/dgzorrtut/image/upload/v1630850961/YelpCamp/khgj0wfrddhp5kyfx6ya.jpg",
          filename: "YelpCamp/khgj0wfrddhp5kyfx6ya",
        },
        {
          url: "https://res.cloudinary.com/dgzorrtut/image/upload/v1630850961/YelpCamp/aoxo3zzr6eni3wbraj2j.jpg",
          filename: "YelpCamp/aoxo3zzr6eni3wbraj2j",
        },
        {
          url: "https://res.cloudinary.com/dgzorrtut/image/upload/v1630850961/YelpCamp/cehlqtwa3xetfsyaaig0.jpg",
          filename: "YelpCamp/cehlqtwa3xetfsyaaig0",
        },
        {
          url: "https://res.cloudinary.com/dgzorrtut/image/upload/v1630851026/YelpCamp/ued0pa30cb2q8a6v7rfw.png",
          filename: "YelpCamp/ued0pa30cb2q8a6v7rfw",
        },
      ],
    });
    await post.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
