require('dotenv').config()
require('./connection/dbconnection')
const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000
const User = require('./routes/userRoute')
const Cart = require('./routes/cartRoute')
const Food = require('./routes/foodRoute')
const Order = require('./routes/orderRoute');
const Contact = require('./routes/contactRoute');
app.use(express.json());
app.use(cors())
// socket 
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://kandufood.netlify.app" || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
require('./socket')(io)
// static
app.use(express.static(__dirname))
// using routes
app.use('/api',User);
app.use('/api',Cart);
app.use('/api',Food);
app.use('/api',Order);
app.use('/api',Contact);
app.use('/api',require('./routes/ChatRoute'))
// listning port 
server.listen(port,()=>{
    console.log(`Server is running on port`, port);
})

module.exports = {io}