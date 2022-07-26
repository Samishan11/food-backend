const mongoose = require('mongoose');

const Chatroom = mongoose.Schema({
    user1:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    user2:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Chatroom', Chatroom);