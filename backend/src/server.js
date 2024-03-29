const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const songs = require("./routes/songs");
const albums = require("./routes/album");
const artists = require("./routes/artist");
const playlists = require("./routes/playlist");

require("dotenv").config();

const app = express();
app.use(express.json({ limit: "50mb" }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const port = process.env.PORT || 4001;
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
  .then(() => console.log("Mongo DB connect successful"))
  .catch((error) => console.log("Mongo DB connect successful", error));

app.options("*", cors());
app.use("/", authRouter);
app.use("/songs", songs);
app.use("/albums", albums);
app.use("/artists", artists);
app.use("/playlists", playlists);
