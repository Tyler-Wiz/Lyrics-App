const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Albums } = require("./firebase");
const { Song } = require("../models/songs");
const { Artist } = require("../models/artists");
const newArtist = require("../routes/newArtist");

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

app.use("/post/artist", newArtist);

app.get("/albums", async (req, res) => {
  const snapshot = await Albums.get();
  const songs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(songs);
});

app.get("/api/songs", (req, res) => {
  Song.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/api/artists", (req, res) => {
  Artist.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
