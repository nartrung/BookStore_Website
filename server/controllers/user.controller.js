const User = require("../models/user");
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
        res.json({
          success: true,
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
      let foundedUser = await User.findOne({ _id: req.params.id });
      if (foundedUser) {
        res.json({
          success: true,
          user: foundedUser,
        });
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
      let foundUser = await User.findOne({ _id: req.params.id });
      if (foundUser) {
        if(req.body.name)
          foundUser.name = req.body.name;
        if(req.body.email)
          foundUser.email = req.body.email;
        if(req.body.password)
          foundUser.password = req.body.password;
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
