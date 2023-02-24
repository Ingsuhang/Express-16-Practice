const AppConstant = {
    JWT_SECRET : "Admin123",
    SMTP: {
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
          user: "5f823027173a50", 
          pass: "60104226e464ea", 
        }},
    DATABASE : {
        URL: "mongodb://127.0.0.1:27017",
        NAME: "express-16"
    }
}

module.exports = AppConstant;