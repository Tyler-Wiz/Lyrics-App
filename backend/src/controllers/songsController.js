const { Song } = require("../models/songs");
const cloudinary = require("../helpers/cloudinary");
const joi = require("joi");
const { songSchema, songUpdateSchema } = require("../validator/songs");

exports.create = async (req, res, next) => {
  try {
    const { error } = songSchema.validate(req.body.data);
    if (error) res.status(400).send(error.details[0].message);
    const { artwork } = req.body.data;
    if (artwork) {
      const uploadImg = await cloudinary.uploader.upload(artwork, {
        upload_preset: "lyricsplug",
      });
      if (uploadImg) {
        const song = new Song({
          ...req.body.data,
          artwork: uploadImg.url,
        });
        await song.save();
        res.status(200).send("successful");
      }
    }
  } catch (error) {
    if (error) res.status(400).send(error);
  }
};

exports.read = async (req, res, next) => {
  try {
    const songs = await Song.find();
    res.status(200).send(songs);
  } catch (error) {
    next(error.response.data);
  }
};

exports.update = async (req, res, next) => {
  const { error } = songUpdateSchema.validate(req.body.data);
  if (error) res.status(400).send(error.details[0].message);
  if (!error) {
    const mondoId = req.body.data._id;
    try {
      let updated = await Song.findByIdAndUpdate(mondoId, {
        ...req.body.data,
      });
      updated = await updated.save();
      res.status(200).send("successful");
    } catch (error) {
      console.log(error);
    }
  }
};
