const Room = require('../model/chatroomModel')
const Chat = require('../model/chatModel')

exports.createRoom = async (req, res) => {
    const room_ = await Room.findOne({ user1: req.userInfo._id, user2: req.body.user2 })
    console.log(req.body , req.userInfo._id);
    if (room_) {
        res.json(room_)
    } else {
       await new Room(
        { user1: req.userInfo._id, user2: req.body.user2 }
        ).save()
        res.json(room_)
    }
}

exports.getRoom = async (req, res) => {
    const room_ = await Room.findOne({ _id: req.params.roomId }).populate('user1').populate('user2')
    res.json(room_)
}
exports.getChat = async (req, res) => {
   try {
    const chat = await Chat.find({ room: req.params.roomId })
    res.json(chat)
   } catch (error) {
       res.json(error)
   }
}
