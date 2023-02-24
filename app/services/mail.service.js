const nodemailer = require("nodemailer");
const AppConstant = require("../../config/constant");

const sendMail = async (data) => {
    try{
        let transporter = nodemailer.createTransport(AppConstant.SMTP);

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