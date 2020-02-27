const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3030;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

require("./routes/api_routes")(app);
require("./routes/html_routes")(app);

app.get("/", (err, res) => {
  res.sendFile(path.join(__dirname, "/Develop/public/index.html"));
});

app.get("/api/workout", (err, res) => {
  db.Workout.find({}).then( data => {
    res.json(data)
  })
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
