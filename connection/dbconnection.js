const mongoose =require('mongoose');
mongoose.connect('mongodb+srv://jokershan:password123joker@cluster0.cyu7q.mongodb.net/mernfoodapp?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to mongodb");
}).catch()