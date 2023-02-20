const nodemailer = require("nodemailer");

const sendMail = async () => {
    try{
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
              user: testAccount.user, 
              pass: testAccount.pass, 
            },
          });

        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: "bar@example.com, baz@example.com", 
            subject: "Hello ✔", 
            text: "Hello world?", 
            html: "<b>Hello world?</b>", 
          });

    }
    catch(err){
        console.log(err)
    }
}

module.exports = sendMail;