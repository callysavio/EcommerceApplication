import express from "express";
import httpstatus from "http-status";
import dotenv from "dotenv";
import morgan from 'morgan';
import dbConnection from "./config/dbConnection.js";
import colors from "colors";
import bodyParser from "body-parser";
import cors from "cors";


//Create an instance of Express server
const app = express();
dotenv.config();

const { PORT  } = process.env

app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cors());



// app.use('/api/users', usersRoute)
// app.use('/api/admin', adminRoute)
// app.use('/api/books', bookRoute)



app.get("/", (req, res) => {
  res.status(httpstatus.OK).json({
    status: "success",
    message: "Welcome to my e-library web application server!",
  });
});


dbConnection().then(() => {
  console.log("Database connection successful" .bgGreen)
  app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.bgMagenta);
});

}).catch((error) => {
  console.log(`Error: ${error}`.bgRed);
})

