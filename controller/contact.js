const contactModel = require('../model/contactModel')
const {mail} = require('../utils/mail')
exports.contact = async (req, res) => {
    const username = req.body.username
    const lastname = req.body.lastname
    const email = req.body.email
    const message = req.body.message
    try {
        console.log(req.body);
       const contact =  await new contactModel({
            firstname: username,
            email: email,
            lastname: lastname,
            message: message,
        })
        await contact.save()
        mail().sendMail({
            from: "joker.shan99@gmail.com",
            to: email,
            subject: `You got new mail from ${email}`,
            html: `<p style="text-align:center; font-size:16px;"> ${subject}  </p>`
        })   

    } catch (error) {
        res.json(error)
    }
}