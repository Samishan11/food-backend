const auth = require('./verify')
module.exports.verifyUser = (req,res,next)=>{
    auth.verifyUser(req,res , ()=>{
        if(req.userInfo.id || req.userInfo.isAdmin){
            next();
        }else{
            res.status(401).json("Yoy are not authorized")
        }
    })
}