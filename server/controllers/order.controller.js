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
  async getAll(req, res) {
    try {
      let orders = await Order.find().deepPopulate("owner products.productID").exec();
      res.json({
        success: true,
        orders: orders
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async updateOrderStatus(req, res) {
    try {
      let foundOrder = await Order.findOne({ _id: req.params.id });
      if (foundOrder) {
        if(foundOrder)
        foundOrder.status = "Đã giao hàng";
        await foundOrder.save();
        res.json({
          success: true,
          message: "Order has been updated",
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

module.exports = new OrderController();
