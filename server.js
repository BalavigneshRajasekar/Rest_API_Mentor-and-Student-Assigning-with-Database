const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routers/controller");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/students", router);

mongoose.connect("mongodb://localhost:27017/SchoolData").then(() => {
  console.log("Database connected");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
