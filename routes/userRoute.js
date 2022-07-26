const express = require("express");
const router = express.Router();
const {register, login, verifyEmail ,OTPresend, Forgotpassword, Resetpassowrd ,allUser, userProfileUpdate} = require('../controller/auth')
const auth = require('../middleware/verify')
router.post('/register',register)
router.get('/alluser',allUser)
router.post('/login',login)
router.post('/verifyotp',verifyEmail)
router.put('/resend-otp/:email',OTPresend)
router.post('/forgot-password',Forgotpassword)
router.put('/reset-password/:token',Resetpassowrd)
router.put('/update-user/:userId',userProfileUpdate)

module.exports = router;