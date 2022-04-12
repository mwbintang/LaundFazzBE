const {User} = require('../models')
const { transporter } = require('../helper/nodemailer')

class UserController{
    static async register(req, res, next){
        try {
            console.log('test')
            console.log(req.body)
            const {email, password} = req.body
            console.log(email, password)
            const data = await User.create({email, password})
            let mailOptions = {
                from: "testinghaloprof@gmail.com",
                to: `${email}`,
                subject: "Laundry Fazz",
                text: `Telah register di Laundry Fazz.`,
            };
            res.status(200).json(data)

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Email Sent:" + info.response);
                }
            });

        } catch (error) {
            res.status(500).json({msg:'error'})
        }
    }
}

module.exports = UserController;