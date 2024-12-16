import express from "express";
import httpStatus from "http-status";
import dotenv from "dotenv";
import morgan from 'morgan';
import dbConnection from "./config/dbConnection.js";
import colors from "colors";
import cors from "cors";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js"; 
import path from "path";

// Create an instance of Express server
const app = express();
dotenv.config();

const { PORT } = process.env;

// Middleware setup
app.use(morgan('dev'));
app.use(express.json()); // Use express built-in JSON middleware
app.use(cors()); // Enable cross-origin resource sharing

// Serve static files for uploaded images (if any)
app.use('/uploads', express.static(path.resolve('uploads')));

// Routes setup
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);

// Home route
app.get("/", (req, res) => {
  res.status(httpStatus.OK).json({
    status: "success",
    message: "Welcome to my e-commerce web application server!",
  });
});

// Connect to the database and start the server
dbConnection().then(() => {
  console.log("Database connection successful".bgGreen);
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`.bgMagenta);
  });
}).catch((error) => {
  console.log(`Error: ${error}`.bgRed);
});

// Generic error handler (Optional but recommended for catching unhandled errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: "An unexpected error occurred",
  });
});
