const nodemailer = require("nodemailer");

const sendMail = async (data) => {
    try{
        let transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 587,
            auth: {
              user: "5f823027173a50", 
              pass: "60104226e464ea", 
            }})

        let info = await transporter.sendMail({
            from: data.from,
            to: data.to, 
            subject: data.subject, 
            text: data.textMessage ?? null, 
            html: data.message, 
          })
          if(info){
            return true;
          }else
          {
            throw "EMAIL NOT SEND!";
          }
    }
    catch(err){
        console.log(err)
    }
}

module.exports = sendMail;