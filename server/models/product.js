const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    author: {type: Schema.Types.ObjectId, ref: 'Author'},
    title: String,
    description: String,
    photo: String,
    price: Number,
    stockQuantity: Number
});

module.exports = mongoose.model("Product", ProductSchema);