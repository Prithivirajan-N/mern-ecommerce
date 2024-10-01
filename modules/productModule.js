const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now, // Automatically sets the order date
    },
    userId: { // Reference to the user
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;
