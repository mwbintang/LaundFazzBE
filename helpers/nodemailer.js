const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "testinghaloprof@gmail.com",
		pass: process.env.PASSWORD,
	},
});

module.exports={
    transporter
}