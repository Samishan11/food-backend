const mongoose = require('mongoose');

const Chat = mongoose.Schema({
    sender:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiver:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room"
    },
    chat:{
        type:String
    }
})

module.exports = mongoose.model('Chat', Chat);