const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    productId: String,
    image:{
        type: String,
        required: false
    },
    title: String,
    price: Number,
    quantity: { type: Number, default: 1 }
});

module.exports = productSchema;