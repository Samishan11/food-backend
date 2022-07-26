const mongoose = require('mongoose')

const User = mongoose.model("User", {
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: Number,
        default:0
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    verified:{
        type: Boolean,
        require: true,
        default:false
    }
})

module.exports = User;