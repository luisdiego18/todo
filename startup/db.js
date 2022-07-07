const mongoose = require("mongoose");

const db = "mongodb://localhost/todo";

module.exports = function () {
  mongoose
    .connect(db)
    .then(() => console.log("Connected to MongoDb"))
    .catch((error) => console.error("Connected to MongoDB"));
};
