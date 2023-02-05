const bcrypt = require("bcrypt");
const joi = require("joi");
const express = require("express");
const { User } = require("../models/users");
const genAuthToken = require("../helpers/genAuthToken");

const router = express.Router();

router.put("/", async (req, res) => {
  const schema = joi.object({
    isAdmin: joi.boolean(),
    _id: joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const id = req.body._id;
  let updatedUser = await User.findByIdAndUpdate(id, {
    isAdmin: req.body.isAdmin,
  });

  updatedUser = await updatedUser.save();
  const token = genAuthToken(updatedUser);

  res.send(token);
});

module.exports = router;
