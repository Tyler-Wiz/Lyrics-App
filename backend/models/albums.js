const mongoose = require("mongoose");

const albumSongSchema = new mongoose.Schema({
  artistName: { type: String, required: true },
  id: { type: String, required: true },
  lyrics: { type: String, required: true },
  trackName: { type: String, required: true },
  duration: { type: String },
});

const albumSchema = new mongoose.Schema(
  {
    albumName: { type: String, required: true },
    artistName: { type: String, required: true },
    artwork: { type: String, required: true },
    tag: { type: String },
    id: { type: String, required: true },
    songs: [albumSongSchema],
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);
exports.Album = Album;
