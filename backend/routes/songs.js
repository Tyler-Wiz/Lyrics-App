const express = require("express");
const { Song } = require("../models/songs");
const joi = require("joi");
const cloudinary = require("../helpers/cloudinary");

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    album,
    artwork,
    artistName,
    id,
    category,
    lyrics,
    playlist,
    trackName,
    youtube,
    tag,
    duration,
  } = req.body.data;

  try {
    if (artwork) {
      const uploadImg = await cloudinary.uploader.upload(artwork, {
        upload_preset: "lyricsplug",
      });
      if (uploadImg) {
        const song = new Song({
          album,
          artwork: uploadImg.url,
          artistName,
          id,
          category,
          lyrics,
          playlist,
          trackName,
          youtube,
          tag,
          duration,
        });
        const savedSong = await song.save();
        res.status(200).send("successful");
      }
    }
  } catch (error) {
    if (error) res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).send(songs);
  } catch (error) {
    res.status(500).send(error.reponse.data);
  }
});

router.put("/", async (req, res) => {
  const schema = joi.object({
    _id: joi.string().required(),
    artwork: joi.string().required(),
    artistName: joi.string().required(),
    id: joi.string().required(),
    lyrics: joi.string().required(),
    trackName: joi.string().required(),
    album: joi.string().allow(""),
    category: joi.string().allow(""),
    youtube: joi.string().allow(""),
    tag: joi.string().allow(""),
    playlist: joi.string().allow(""),
    updatedAt: joi.string().allow(""),
    duration: joi.string().allow(""),
  });

  const { error } = schema.validate(req.body.data);
  if (error) res.status(400).send(error.details[0].message);

  if (!error) {
    const mondoId = req.body.data._id;
    try {
      let updated = await Song.findByIdAndUpdate(mondoId, {
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
