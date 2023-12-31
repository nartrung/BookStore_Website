const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

class UserController {
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      res.json({
        success: false,
        message: "Please enter email or password",
      });
    } else {
      try {
        let newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        await newUser.save();
        let token = jwt.sign(newUser.toJSON(), process.env.SecretJWT, {
          expiresIn: 604800,
        });
        res.json({
          success: true,
          token: token,
          message: "Successfully created a new user",
        });
      } catch (err) {
        res.status(500).json({
          success: true,
          message: err.message,
        });
      }
    }
  }
  async profile(req, res) {
    try {
      let foundUser = await User.findOne({ _id: req.decoded._id });
      if (foundUser) {
        res.json({
          success: true,
          user: foundUser,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async login(req, res) {
    try {
      let foundUser = await User.findOne({ email: req.body.email });
      if (!foundUser) {
        res.status(403).json({
          success: false,
          message: "User not found",
        });
      } else {
        if (foundUser.comparePassword(req.body.password)) {
          let token = jwt.sign(foundUser.toJSON(), process.env.SecretJWT, {
            expiresIn: 604800,
          });

          res.json({ success: true, token: token });
        } else {
          res.status(403).json({
            success: false,
            message: "Wrong password!",
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async updateProfile(req, res) {
    try {
      let foundUser = await User.findOne({ _id: req.decoded._id });
      if (foundUser) {
        if(req.body.name)
          foundUser.name = req.body.name;
        if(req.body.email)
          foundUser.email = req.body.email;
        if(req.body.password)
          foundUser.password = req.body.password;
        if(req.body.city)
          foundUser.city = req.body.city;
        if(req.body.address)
          foundUser.address = req.body.address;
        if(req.body.phone)
          foundUser.phone = req.body.phone;
        await foundUser.save();
        res.json({
          success: true,
          message: "Profile has been updated",
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new UserController();
