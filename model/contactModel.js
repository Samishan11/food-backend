const mongoose = require('mongoose');

const Contact = mongoose.Schema({
    email:{
        type:String
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    message:{
        type:String
    }
})

module.exports = mongoose.model('Contact', Contact);