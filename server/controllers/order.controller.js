const Order = require("../models/order");

class OrderController {
  async getAllOrder(req, res) {
    try {
      let products = await Order.find({owner: req.decoded._id})
      .deepPopulate("owner products.productID.author")
      .exec();
      res.json({
        success: true,
        products: products
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new OrderController();
