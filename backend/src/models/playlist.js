const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artwork: { type: String, required: true },
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", playlistSchema);

exports.Playlist = Playlist;
