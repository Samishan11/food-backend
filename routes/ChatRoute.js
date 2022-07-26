const express = require('express')
const router = express.Router()
const {createRoom,getRoom ,getChat}  = require('../controller/chat')
const auth = require('../middleware/verify')
router.post('/create-room',auth.verifyUser,createRoom)
router.get('/get-room/:roomId',getRoom)
router.get('/get-chat/:roomId',getChat)
module.exports = router;