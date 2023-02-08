const express = require("express");
const { Artist } = require("../models/artists");
const cloudinary = require("../helpers/cloudinary");
const joi = require("joi");

const router = express.Router();
router.post("/", async (req, res) => {
  const { id, name, tag, url } = req.body.data;
  try {
    if (url) {
      const uploadImg = await cloudinary.uploader.upload(url, {
        upload_preset: "lyricsplug",
      });
      if (uploadImg) {
        let artist = new Artist({
          id,
          name,
          tag,
          url: uploadImg.url,
        });
        artist = await artist.save();
        res.status(200).send("successful");
      }
    }
  } catch (error) {
    if (error) res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).send(artists);
  } catch (error) {
    res.status(500).send(error.reponse.data);
  }
});

router.put("/", async (req, res) => {
  const schema = joi.object({
    _id: joi.string().required(),
    name: joi.string().required(),
    id: joi.string().required(),
    url: joi.string().required(),
    tag: joi.string().allow(""),
    updatedAt: joi.string().allow(""),
  });

  const { error } = schema.validate(req.body.data);
  if (error) res.status(400).send(error.details[0].message);

  if (!error) {
    const mondoId = req.body.data._id;
    try {
      let updated = await Artist.findByIdAndUpdate(mondoId, {
        _id: req.body.data._id,
        album: req.body.data.album,
        artwork: req.body.data.artwork,
        artistName: req.body.data.artistName,
        id: req.body.data.id,
        category: req.body.data.category,
        lyrics: req.body.data.lyrics,
        playlist: req.body.data.playlist,
        trackName: req.body.data.trackName,
        youtube: req.body.data.youtube,
        tag: req.body.data.tag,
      });
      updated = await updated.save();
      res.status(200).send("successful");
    } catch (error) {
      if (error) res.status(500).send(error.reponse.data);
    }
  }
});

module.exports = router;
