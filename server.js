const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routers/controller");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/students", router);

mongoose.connect(process.env.MONGODB).then(() => {
  console.log("Database connected");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
