require("dotenv").config()
const mongoose = require("mongoose");
const URI = process.env.DB_URI

mongoose.connect(process.env.DB_URI, (err) => {
  err ? console.log(err) : console.log("Mongo Atlas connected");
});