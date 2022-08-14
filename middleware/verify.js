const jwt = require("jsonwebtoken");
const user = require('../model/userModel');

// middlewarre to verify the user 
// module.exports.verifyUser =  (req, res, next) => {
//         const token = req.headers.authorization.split(' ')[1];
//         console.log(token)
//         const user = jwt.verify(token, process.env.SECRET_KEY);
//         console.log(user)
//          User.findOne({ _id: user._id }).then((result) =>{
//             req.userInfo = result;
//             console.log(result);
//             next();
//         }).catch((e) => {
//             res.json({ 'error': e })
//         })
// }

module.exports.verifyUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if(!token){
            res.json({message: "Login Required!", success:false})
        }

        const data = jwt.verify(token, process.env.SECRET_KEY);
        const client = user.findOne({ _id: data._id }).then(function (result) {
            req.userInfo = result;
            next();
        }).catch();
    }
    catch (e) {
        res.json({message: e, success: false})
    }
}