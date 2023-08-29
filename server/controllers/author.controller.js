const Author = require("../models/author");

class AuthorController {
  async create(req, res) {
    try {
      let author = new Author();
      author.name = req.body.name;
      author.about = req.body.about;
      author.photo = req.file.path;
      await author.save();
      res.json({
        success: true,
        message: "Successfully created new author",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async findAll(req, res) {
    try {
      let authors = await Author.find();
      res.json({
        authors: authors,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async getOne(req, res) {
    try {
      let author = await Author.findOne({ _id: req.params.id });
      res.json({
        success: true,
        author: author,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async updateProfile(req, res) {
    try {
      let foundAuthor = await Author.findOne({ _id: req.params.id });
      if (foundAuthor) {
        if(req.body.name)
          foundAuthor.name = req.body.name;
        if(req.body.about)
          foundAuthor.about = req.body.about;
        await foundAuthor.save();
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
  async delete(req, res) {
    try {
      let deleteAuthor = await Author.findOneAndDelete({ _id: req.params.id });

      if (deleteAuthor) {
        res.json({
          status: true,
          message: "Successfully deleted",
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

module.exports = new AuthorController();
