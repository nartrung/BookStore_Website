const moment = require("moment");
const Order = require("../models/order");
const Product = require("../models/product");

const SHIPMENT = {
  standard: {
    price: 25000,
    days: 7,
  },
  fast: {
    price: 49000,
    days: 3,
  },
};

function shipmentPrice(shipmentOption) {
  moment.locale("vi");
  let estimated = moment()
    .add(shipmentOption.days, "d")
    .format("dddd, Do MMMM");

  return { estimated, price: shipmentOption.price };
}

class PaymentController {
  async createShipment(req, res) {
    try {
      let shipment;
      if (req.body.shipment === "standard") {
        shipment = shipmentPrice(SHIPMENT.standard);
      } else {
        shipment = shipmentPrice(SHIPMENT.fast);
      }

      res.json({ success: true, shipment: shipment });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
  async payment(req, res) {
    try {
      let cart = req.body.cart;
      let order = new Order();

      cart.map((product) => {
        order.products.push({
          productID: product._id,
          quantity: parseInt(product.quantity),
          price: product.price,
        });
      });
      order.owner = req.decoded._id;
      order.city = req.decoded.city;
      order.address = req.decoded.address;
      order.phone = req.decoded.phone;
      order.estimatedDelivery = req.body.estimatedDelivery;
      order.totalPrice = parseInt(req.body.totalPrice);

      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth()+1;
      let year = date.getFullYear();
      let currentDate = `${day}-${month}-${year}`;
      order.createAt = currentDate;
      await order.save();
      res.json({
        success: true,
        message: "Successfully created new product",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new PaymentController();
