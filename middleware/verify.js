const jwt = require("jsonwebtoken");
const User = require('../model/userModel');

// middlewarre to verify the user 
module.exports.verifyUser =  (req, res, next) => {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
         User.findOne({ _id: user._id }).then((result) =>{
            req.userInfo = result;
            // console.log(result);
            next();
        }).catch((e) => {
            res.json({ 'error': e })
        })
}