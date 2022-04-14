const {User} = require('../models')
const { transporter } = require('../helper/nodemailer')
const {compare} = require('../helper/bcrypt')
const {signJWT} = require('../helper/jwt')

class UserController{
    static async register(req, res, next){
        try {
            const {email, password} = req.body
            const data = await User.create({email, password})
            let mailOptions = {
                from: "testinghaloprof@gmail.com",
                to: `${email}`,
                subject: "Laundry Fazz",
                text: `Telah register di Laundry Fazz.`,
            };
            
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    throw ({name:'nodemailer error'})
                } else {
                    console.log("Email Sent:" + info.response);
                }
            });
            res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }
    static async login(req, res, next){
        try {
            const {email, password} = req.body
            if(!email || !password){
                throw({name:'wrong email/password'})
            }
            let emailSearch = await User.findOne({where:{email}})
            if(!emailSearch){
                throw ({name:'email/password not valid'})
            }
            let comaparePass = compare(password, emailSearch.password)
            if(!comaparePass){
                throw ({name:'wrong email/password'})
            }
            let access_token = signJWT({
                id: emailSearch.id,
                role: emailSearch.role
            })
            res.status(200).json({access_token})

        } catch (error) {
            next(error)
        }
    }
    static async list(req, res, next){
        try {
            const data = await User.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController;