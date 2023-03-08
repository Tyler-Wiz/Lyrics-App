const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const registerUser = require("../routes/registerUser");
const loginUser = require("../routes/loginUser");
const songs = require("../routes/songs");
const albums = require("../routes/album");
const artists = require("../routes/artist");
const playlists = require("../routes/playlist");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const port = process.env.PORT || 1000;
const uri = process.env.MONGODB_URI;
app.listen(port, console.log(`Server is running on port ${port}`));

app.get("/", (req, res) => {
  res.send("Welcome to our online Shop API");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo DB connect succesful"))
  .catch((error) => console.log("Mongo DB connect succesful", error));

app.options("*", cors());
app.use("/register", registerUser);
app.use("/login", loginUser);
app.use("/songs", songs);
app.use("/albums", albums);
app.use("/artists", artists);
app.use("/playlists", playlists);
