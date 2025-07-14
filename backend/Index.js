// Import required modules
const express = require("express");
const app = express(); // Initialize Express app

// Import route handlers
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/course");
const paymentRoutes = require("./routes/Payment");
const contactUsRoute = require("./routes/Contact");

// Import database configuration
const database = require("./config/database");

// Import middleware packages
const cookieParser = require("cookie-parser");
const cors = require("cors"); //this type of import is used to bring in the entire module, which can contain multiple exports  at last of all the fn  module.exports = {abc,bcd,edf}
const { cloudinaryConnect } = require("./config/Cloudinary");  //this type of import is used to bring single exported function from a module . exports.cloudinaryConnect = () => { ... }
const fileUpload = require("express-fileupload");

// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

// Define the port for the server (default: 4000 if not specified in .env)
const PORT = process.env.PORT || 4000;

// Connect to the database
database.connect();

// Middleware setup
app.use(express.json()); // Enable JSON parsing in requests
app.use(cookieParser()); // Enable cookie parsing

// Enable CORS to allow requests from different origins
app.use(
  cors({
    origin: "*", // Allows access from all origins (consider restricting this in production)
    credentials: true,
  })
);

// Enable file upload with temporary file storage
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // Temporary directory for file uploads
  })
);

// Connect to Cloudinary for media storage
cloudinaryConnect();

// Set up API routes
app.use("/api/v1/auth", userRoutes); // User authentication routes
app.use("/api/v1/profile", profileRoutes); // User profile management routes
app.use("/api/v1/course", courseRoutes); // Course-related routes
app.use("/api/v1/payment", paymentRoutes); // Payment processing routes
app.use("/api/v1/reach", contactUsRoute); // Contact Us form routes

// Default route for the root endpoint
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Welcome To ShikshaSutra",
  });
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
