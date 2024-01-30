const { Album } = require("../models/albums");
const cloudinary = require("../helpers/cloudinary");

exports.create = async (req, res) => {
  try {
    const { artwork } = req.body.data;
    if (artwork) {
      const uploadImg = await cloudinary.uploader.upload(artwork, {
        upload_preset: "lyricsplug",
      });
      if (uploadImg) {
        let album = new Album({
          ...req.body.data,
          artwork: uploadImg.url,
        });
        album = await album.save();
        res.status(200).send("successful");
      }
    }
  } catch (error) {
    if (error) res.status(400).send(error);
  }
};

exports.read = async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).send(albums);
  } catch (error) {
    res.status(500).send(error.response.data);
  }
};
