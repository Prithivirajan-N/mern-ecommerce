const mongoose =require('mongoose');

const orderItemSchema = mongoose.Schema({
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

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;