const mongoose = require('mongoose');

const Cart = mongoose.Schema({
    food:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
    },
    name:{
        type:String
    },
    price:{
        type:Number
    },
    quantity: {
        type: Number,
    },
    image:{
        type:String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Cart', Cart);