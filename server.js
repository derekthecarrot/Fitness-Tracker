const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api-routes");
const htmlRoutes = require("./routes/html-routes");
const logger = require("morgan");
const db = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(apiRoutes);
app.use(htmlRoutes);

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const connection = mongoose.connection;

// if successful mongoose connection
connection.on("connected", () => {
  console.log("Mongoose connected successfully.");
});

// if unsuccessful mongoose connection
connection.on("error", (err) => {
  console.log("Mongoose connected error:" + err);
});

// listen on the PORT
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
