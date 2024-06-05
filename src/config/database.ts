// db.js
const mongoose = require("mongoose");
const mongoURL = process.env.MONGODB_URI;
mongoose.connect(mongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongodb connection fAILED");
});
connection.on("connected", () => {
  console.log("mongodb connected sucessfully");
});

module.exports = mongoose;
