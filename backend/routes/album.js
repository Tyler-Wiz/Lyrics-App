const express = require("express");
const { Album } = require("../models/albums");

const router = express.Router();
router.post("/", async (req, res) => {
  const { albumName, artistName, artwork, tag, id, songs } = req.body;
  let album = new Album({
    albumName,
    artistName,
    artwork,
    tag,
    id,
    songs,
  });

  album = await album.save();
  res.send(album);
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
