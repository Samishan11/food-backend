const nodemailer = require('nodemailer')
exports.mail = () =>
    nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.HOST,
            pass: process.env.PASS
        }
    });
