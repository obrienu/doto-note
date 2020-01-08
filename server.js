const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/api/user.route");
const path = require("path");
const config = require("config");

const app = express();

app.use(express.json());

//mongoose connect
let dbUrl;

if (process.env.NODE_ENV === "production") {
  dbUrl = config.get("mongoURI");
} else {
  dbUrl = config.get("mongoURILocal");
}

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("APP CONNECTED TO MONGOOSE ATLAS"))
  .catch(error => console.log("CANNOT CONNECT TO MONGO ATLAS: ", error));

//Get Items Route

app.use("/api/user", userRoute);

//serve static file while app is in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/client/build/index.html"));
  });
}

const port = process.env.PORT || 5050;

app.listen(port, () => console.log("APP IS RUNNING ON PORT " + port));
