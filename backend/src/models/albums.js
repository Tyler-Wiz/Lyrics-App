const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    albumName: { type: String, required: true },
    artistName: { type: String, required: true },
    artwork: { type: String, required: true },
    tag: { type: String },
    id: { type: String, required: true },
  },
  { timestamps: true }
);

const Album = mongoose.model("Album", albumSchema);
exports.Album = Album;
