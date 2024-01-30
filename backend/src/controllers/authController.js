const bcrypt = require("bcrypt");
const joi = require("joi");
const { User } = require("../models/users");
const genAuthToken = require("../helpers/genAuthToken");

exports.register = async (req, res) => {
  try {
    const schema = joi.object({
      name: joi.string().max(40).min(3).required(),
      email: joi.string().min(6).max(40).required().email(),
      password: joi.string().min(6).max(1024).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    if (!error) {
      // find user by email
      let user = await User.findOne({ email: req.body.email });
      if (user) res.status(400).send("Email already Exit");
      if (!user) {
        // create new user
        user = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        // hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        // Save user
        user = await user.save();
        // generate Token
        const token = genAuthToken(user);
        // send token
        res.send(token);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const schema = joi.object({
      email: joi.string().min(6).max(40).required().email(),
      password: joi.string().min(6).max(1024).required(),
    });
    // Validate the request Object //
    const { error } = schema.validate(req.body);
    if (error) res.status(400).send(error.details[0].message);
    if (!error) {
      // Validate Login Email & Find User//
      let user = await User.findOne({ email: req.body.email });
      if (!user) res.status(400).send("Invalid Email Address");
      // Validate Password //
      const passwordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordValid) res.status(400).send("Invalid Password");
      // generate Token //
      const token = genAuthToken(user);
      res.send(token);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
