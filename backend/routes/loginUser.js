const bcrypt = require("bcrypt");
const joi = require("joi");
const express = require("express");
const { User } = require("../models/users");
const genAuthToken = require("../helpers/genAuthToken");

const router = express.Router();

router.post("/", async (req, res) => {
  const schema = joi.object({
    email: joi.string().min(6).max(40).required().email(),
    password: joi.string().min(6).max(1024).required(),
  });

  // Validate the request Object //
  const { error } = schema.validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // Validate Login Email & Find User//
  let user = await User.findOne({ email: req.body.email });
  if (!user) res.status(400).send("Invalid Email Address");

  // Validate Password //
  const passwordValid = await bcrypt.compare(req.body.password, user.password);
  if (!passwordValid) res.status(400).send("Invalid Password");

  // generate Token //
  const token = genAuthToken(user);
  res.send(token);
});

module.exports = router;
