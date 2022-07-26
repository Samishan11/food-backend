const mongoose = require('mongoose')

const Food = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    catagory: {
        type: Array
    },
    image: {
        type: String
    },
    rating: {
        type: Array
    },
    totalrating:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('Food', Food);