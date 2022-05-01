//Dependencies
const express = require("express");
const app = express();
require("dotenv").config();

//Imports
const reportRouter = require("./routes/reports");
const Database = require("./config/database");

// Database Connection
Database();

//Middleware
app.use(express.json());

//Routes
app.use("/reports", reportRouter);

const Port = process.env.Port | 5000;
//Server listen
app.listen(Port, () => {
  console.log(`Server is running on port : ${Port}`);
});
