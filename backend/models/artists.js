const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    tag: { type: String },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const Artist = mongoose.model("Artist", artistSchema);
exports.Artist = Artist;
