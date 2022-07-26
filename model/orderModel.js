const mongoose = require('mongoose');

const Order = mongoose.Schema({
    total_price: {
        type: Number
    },
    foods:
        [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food"
                },
                quantity: {
                    type: Number,
                },
            }
        ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: 'pending'
    },
    order_at: {
        type: Date,
        default: new Date()
    },
    payment: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Order', Order);

