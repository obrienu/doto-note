const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const todoRoute = require("./routes/api/items.route");
const path = require("path");

const app = express();

app.use(bodyParser.json());

//mongoose connect
const dbUrl = require("./config/keys").mongoURI;
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("APP CONNECTED TO MONGOOSE ATLAS"))
  .catch(error => console.log("CANNOT CONNECT TO MONGO ATLAS: ", error));

//Get Items Route
app.use("/api/todo", todoRoute);

//serve static file while app is in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build/index.html"));
  });
}

const port = process.env.PORT || 5050;

app.listen(port, () => console.log("APP IS RUNNING ON PORT " + port));
