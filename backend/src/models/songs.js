const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    album: { type: String },
    artistName: { type: String, required: true },
    artwork: { type: String, required: true },
    category: { type: String },
    __id__: { type: String, required: true },
    lyrics: { type: String, required: true },
    playlist: { type: String },
    tag: { type: String },
    trackName: { type: String, required: true },
    youtube: { type: String },
    duration: { type: String },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", songSchema);
exports.Song = Song;
