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
      let foundUser = await User.findOne({ _id: req.params.id });
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
}

module.exports = new UserController();
