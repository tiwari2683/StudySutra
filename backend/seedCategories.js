require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URL);

  // Check if at least one category exists
  const count = await Category.countDocuments();
  if (count === 0) {
    await Category.create([
      { name: "Programming", description: "All programming courses" },
      { name: "Design", description: "All design courses" },
      { name: "AI/ML", description: "All Data SCience Courses" },
      { name: "Data Science", description: "All Data Science Courses" },
      { name: "Web Development", description: "All Web Development Courses" },
      { name: "Mobile Development", description: "All Mobile Development Courses" },
      { name: "Cloud Computing", description: "All Cloud Computing Courses" },
      { name: "Cyber Security", description: "All Cyber Security Courses" },
      { name: "Blockchain", description: "All Blockchain Courses" },
      { name: "Game Development", description: "All Game Development Courses" }
    ]);
    console.log("Categories seeded!");
  } else {
    console.log("Categories already exist, skipping seeding.");
  }

  mongoose.disconnect();
}

seed(); 