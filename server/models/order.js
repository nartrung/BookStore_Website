const mongoose = require("mongoose");
const deepPopulate = require("mongoose-deep-populate")(mongoose);
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  city: { type: String },
  address: { type: String },
  phone: { type: String },
  products: [
    {
      productID: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],
  estimatedDelivery: String,
  totalPrice: {type: Number},
  status:{type: String, default:"Đang giao hàng"}
});

OrderSchema.plugin(deepPopulate);

module.exports = mongoose.model("Order", OrderSchema);
