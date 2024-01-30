const joi = require("joi");

const songSchema = joi.object({
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
  duration: joi.string().allow(""),
});

const songUpdateSchema = joi.object({
  _id: joi.string().required(),
  artwork: joi.string().required(),
  artistName: joi.string().required(),
  __id__: joi.string().required(),
  lyrics: joi.string().required(),
  trackName: joi.string().required(),
  album: joi.string().allow(""),
  category: joi.string().allow(""),
  youtube: joi.string().allow(""),
  tag: joi.string().allow(""),
  playlist: joi.string().allow(""),
  updatedAt: joi.string().allow(""),
  createdAt: joi.string().allow(""),
  duration: joi.string().allow(""),
  __v: joi.number(),
});

module.exports = { songSchema, songUpdateSchema };
