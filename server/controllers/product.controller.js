const Product = require("../models/product");

class ProductController {
  async create(req, res) {
    try {
      let product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        photo: req.file.path,
        stockQuantity: req.body.stockQuantity,
        author: req.body.authorID,
        category: req.body.categoryID,
      });
      await product.save();
      res.json({
        status: true,
        message: "Successfully created new product",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async getAll(req, res) {
    try {
      let products = await Product.find().populate("author category").exec();
      res.json({
        success: true,
        products: products,
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
      let product = await Product.findOne({ _id: req.params.id })
        .populate("author category")
        .exec();
      res.json({
        success: true,
        product: product,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async update(req, res) {
    try {
      let product = await Product.findOne({ _id: req.params.id });
        if (product) {
          if(req.body.categoryID != null)
            product.category = req.body.categoryID;
          if(req.body.authorID != null)
            product.author = req.body.authorID;
          if(req.body.title)
            product.title = req.body.title;
          if(req.body.price)
            product.price = req.body.price;
          if(req.body.stockQuantity >=0)
            product.stockQuantity = req.body.stockQuantity;
          if(req.body.description)
            product.description = req.body.description;
          await product.save();
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
      let deleteProduct = await Product.findOneAndDelete({
        _id: req.params.id,
      });

      if (deleteProduct) {
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

module.exports = new ProductController();
