const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/userModel');
const { mail } = require('../utils/mail')
const otpGenerator = require('otp-generator')
const VerificationToken = require('../model/verificationModel');
const ForgotpasswordModel = require('../model/forgotpasswordModel')
// register user
exports.register = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            res.json({ message: 'user already exist', success: 'false' })
        } else {
            bycrypt.hash(req.body.password, 10, async (e, hasPassword) => {
                const signup = await new UserModel({
                    username: req.body.username,
                    email: req.body.email,
                    password: hasPassword,
                })

                const OTP = otpGenerator.generate(4, { upperCase: false, specialChars: false });
                bycrypt.hash(OTP, 10, async (e, hasOTP) => {
                    const verificationTOk = await new VerificationToken({
                        user: signup._id,
                        token: hasOTP
                    })
                    await verificationTOk.save()
                })
                await signup.save()
                // console.log(signup.email);
                // mail().sendMail({
                //     from: "joker.shan99@gmail.com",
                //     to: signup.email,
                //     subject: "Verify your email",
                //     html: `<p style="text-align:center; font-size:16px;"> Your OTP: ${OTP}</p>`
                // })
                res.json({ message: 'User register sucessfully', success: 'true' })
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// logiuser 
exports.login = async (req, res) => {
    console.log(req.body);
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        const hasing = await bycrypt.compare(req.body.password, user.password);
        console.log(hasing);
        if (hasing) {
            const token = jwt.sign({ _id: user._id, username: user.username, email: user.email ,isAdmin: user.isAdmin, verified: user.verified }, process.env.SECRET_KEY)
            res.json({ 'token': token, verified: user.verified , role: user.role })
            // if(user.verified){
            //     mail().sendMail({
            //         from: "joker.shan99@gmail.com",
            //         to: user.email,
            //         subject: "Foodmandu",
            //         html: `<p style="text-align:center; font-size:16px;">${user.username} just logged in to foodmandu</p>`
            //     })
            // }
        } else {
            res.json('Username or password not match')
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// verify email otp
exports.verifyEmail = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    if (!email || !otp) {
        res.json("Invalid request")
    } else {
        const user = await UserModel.findOne({ email })
        if (!user) {
            res.json("User is not valid")
        } else {
            if (user.verified) {
                res.json("User is already verified")
            } else {
                console.log(user._id.toString());
                const token = await VerificationToken.findOne({ user: user._id.toString() })
                if (!token) {
                    res.json("token is not valid")
                } else {
                    const isComptok = await bycrypt.compare(otp, token.token)
                    if (!isComptok) {
                        res.json("token not match")
                    } else {
                        user.verified = true;
                        await VerificationToken.findOneAndDelete({ _id: token._id.toString() })
                        await user.save()
                        mail().sendMail({
                            from: "joker.shan99@gmail.com",
                            to: user.email,
                            subject: "Verify your email",
                            html: `<p style="text-align:center; font-size:16px;"> Email verified successfully. Please Login </p>`
                        })
                        res.json({ message: "email verified", success: true })
                    }
                }
            }
        }
    }
}

// resend opt 
exports.OTPresend = async (req, res) => {
    const OTP = otpGenerator.generate(4, { upperCase: false, specialChars: false });
    const user = await UserModel.findOne({ email: req.params.email })
    console.log(user);
    const checkUser = await VerificationToken.findOne({ user: user._id });
    if (checkUser) {
        bycrypt.hash(OTP, 10, async (e, hasOTP) => {
            console.log(user._id);
            const sendOtp = await VerificationToken.findOneAndUpdate({ user: user._id.toString() }, {
                token: hasOTP
            }, { new: true })
            res.json(sendOtp)
        })
    } else {
        bycrypt.hash(OTP, 10, async (e, hasOTP) => {
            console.log(user._id);
            const sendOtp = await new VerificationToken({
                user: user._id,
                token: hasOTP
            })
            await sendOtp.save()
            res.json(sendOtp)
        })
    }
    mail().sendMail({
        from: "joker.shan99@gmail.com",
        to: user.email,
        subject: "Verify your email",
        html: `<h1>Your OTp: ${OTP}</h1>`
    })
}

// forgot password 
exports.Forgotpassword = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        res.json("Invalid request")
    } else {
        const user = await UserModel.findOne({ email })
        if (!user) {
            res.json("unauthorized user")
        } else {
            const passwordresetcheck = await ForgotpasswordModel.findOne({ user })
            if (passwordresetcheck) {
                res.json("already send a token")
            } else {
                // const reset_token = otpGenerator.generate(10, { upperCase: false, specialChars: false });
                const reset_token = jwt.sign({ id: user._id }, process.env.SECRET_KEY)
                // bycrypt.hash(reset_token, 10, async (e, has_reset_token) => {
                const forgotpass = await new ForgotpasswordModel({
                    user: user._id.toString(),
                    token: reset_token
                })
                await forgotpass.save()
                mail().sendMail({
                    from: "joker.shan99@gmail.com",
                    to: user.email,
                    subject: "Reset password",
                    html: `<p style="text-align:center; font-size:16px;"> Your reset password request link: <a href="${`http://localhost:3000/reset-password/${reset_token}`}">Reset password link</a> </p>`
                })
                res.json("Your reset passowr link has been sent to your email.")
                // })
            }
        }
    }
}

// reset password
exports.Resetpassowrd = async (req, res) => {
    const token = req.params.token;
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    if (!newpassword && !confirmpassword) {
        res.json('invalid reqest')
    } else {
        const reset_token = await ForgotpasswordModel.findOne({ token: token })
        if (!reset_token) {
            res.json('invalid reqest')
        } else {
            const user = await UserModel.findOne({ _id: reset_token.user })
            if (!user) {
                res.json('user not found')
            } else {
                if (newpassword !== confirmpassword) {
                    res.json("password not match")
                } else {
                    bycrypt.hash(newpassword, 10, async (e, hasPassword) => {
                        await UserModel.findOneAndUpdate({ _id: user._id }, {
                            password: hasPassword
                        })
                    })
                    await ForgotpasswordModel.deleteOne({ user: user._id })
                    res.json('password reset sucessfully')
                }
            }
        }
    }
}
exports.allUser = async(req,res)=>{
    const user = await UserModel.find()
    res.json(user)
}


exports.userProfileUpdate = async(req,res) =>{
    const user = await UserModel.findOne({_id:req.params.userId})
    if(user){
        bycrypt.hash(req.body.password, 10, async (e, hasPassword) => {
            await UserModel.findOneAndUpdate({_id:user},{
                password: hasPassword,
            })
        })
        res.json(user)
    }

}