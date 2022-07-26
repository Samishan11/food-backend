const auth = require('./verify')

module.exports.verifyAdmin =(req,res,next)=>{
    auth.verifyUser(req,res , ()=>{
        if(req.userInfo.isAdmin && req.userInfo.role === 1){
            next();
        }else{
            res.json("You are not authorized")
        }
    })
}