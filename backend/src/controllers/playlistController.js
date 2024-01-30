const cloudinary = require("../helpers/cloudinary");
const { Playlist } = require("../models/playlist");

exports.create = async (req, res) => {
  const { name, artwork } = req.body.data;
  try {
    if (artwork) {
      const uploadImg = await cloudinary.uploader.upload(artwork, {
        upload_preset: "lyricsplug",
      });
      if (uploadImg) {
        let artist = new Playlist({
          name,
          artwork: uploadImg.url,
        });
        artist = await artist.save();
        res.status(200).send("successful");
      }
    }
  } catch (error) {
    if (error) res.status(400).send(error);
  }
};

exports.read = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).send(playlists);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
};
