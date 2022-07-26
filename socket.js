const Chat = require('./model/chatModel')

module.exports = function (io) {
    io.on("connection", (socket) => {
        socket.on("joinRoom", (data) => {
            socket.join(data.roomId)
            console.log("Client joined the room " + data.roomId)
        })

        socket.on("sendMessage", async (data) => {
            if (data.chat) {
                console.log(data);
                const createMessage = new Chat(data)
                createMessage.save().then(function(message){
                    socket.to(data.room).emit("receiveMessage", message)
                    console.log(message);
                }).catch(e=>{
                    console.log(e);
                })
            }
        })
    })

}