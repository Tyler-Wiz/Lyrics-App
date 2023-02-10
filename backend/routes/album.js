const express = require("express");
const { Album } = require("../models/albums");
const cloudinary = require("../helpers/cloudinary");

const router = express.Router();
router.post("/", async (req, res) => {
  const { albumName, artistName, artwork, tag, id, songs } = req.body.data;
  try {
    if (artwork) {
      const uploadImg = await cloudinary.uploader.upload(artwork, {
        upload_preset: "lyricsplug",
      });
      if (uploadImg) {
        let album = new Album({
          albumName,
          artistName,
          tag,
          id,
          songs,
          artwork: uploadImg.url,
        });
        album = await album.save();
        res.status(200).send("successful");
      }
    }
  } catch (error) {
    if (error) res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const albums = await Album.find();
    res.status(200).send(albums);
  } catch (error) {
    res.status(500).send(error.reponse.data);
  }
});

module.exports = router;
