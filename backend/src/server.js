const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const registerUser = require("../routes/registerUser");
const loginUser = require("../routes/loginUser");
const songs = require("../routes/songs");
const albums = require("../routes/album");
const artists = require("../routes/artist");

require("dotenv").config();

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

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

app.use("/register", registerUser);
app.use("/login", loginUser);
app.use("/songs", songs);
app.use("/albums", albums);
app.use("/artists", artists);
