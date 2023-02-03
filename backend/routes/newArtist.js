const express = require("express");
const { Artist } = require("../models/artists");

const router = express.Router();
router.post("/", async (req, res) => {
  const { id, name, tag, url } = req.body;
  let artist = new Artist({
    id,
    name,
    tag,
    url,
  });

  artist = await artist.save();
  res.send(artist);
});

module.exports = router;
