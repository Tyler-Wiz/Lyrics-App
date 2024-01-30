const { Artist } = require("../models/artists");
const cloudinary = require("../helpers/cloudinary");
const joi = require("joi");

exports.create = async (req, res) => {
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
};

exports.read = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).send(artists);
  } catch (error) {
    res.status(500).send(error.reponse.data);
  }
};

exports.update = async (req, res) => {
  const schema = joi.object({
    _id: joi.string().required(),
    name: joi.string().required(),
    id: joi.string().required(),
    url: joi.string().required(),
    tag: joi.string().allow(""),
    updatedAt: joi.string().allow(""),
    createdAt: joi.string().allow(""),
    __v: joi.number(),
  });

  const { error } = schema.validate(req.body.data);
  if (error) res.status(400).send(error.details[0].message);

  if (!error) {
    const mondoId = req.body.data._id;
    try {
      let updated = await Artist.findByIdAndUpdate(mondoId, {
        ...req.body.data,
      });
      updated = await updated.save();
      res.status(200).send("successful");
    } catch (error) {
      if (error) res.status(500).send(error.response.data);
    }
  }
};
