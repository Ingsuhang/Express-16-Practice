const userSvc = require("../services/user.service");
const bcrypt = require("bcryptjs");
const sendMail = require("../services/mail.service");
const jwt = require("jsonwebtoken");
const AppConstant = require("../../config/constant");

class AuthController{
    //LOGIN PROCESS
    loginProcess = async (req, res, next) => {
        try{
            //API FROM USER BODY
            let data = req.body;
            
            await userSvc.validateLogin(data);
            
            let user = await userSvc.getUserByEmail(data.username);

            if(user){
            //COMPARING DATA AND PASS
            if(bcrypt.compareSync(data.password,user.password)){

            //JSON WEB TOKEN
            let token = jwt.sign({userId: user._id},AppConstant.JWT_SECRET)
            
            res.json({
                result: 
                {
                    userDetail: user,
                    token: token
                }, 
                status: true, 
                msg: "Login data fetched",
                meta: null
            })
            }
            else {
                //PASSWORD DOESN"T MATCH
                throw "Credentials does not match."
            }
            } else {
            throw "Credentials does not match."
            }
        }
        catch(err){
            console.log("ERROR: ",err);
            next({status: 400, msg:err})
        }
    }

    //REGISTER PROCESS
    registerProcess = async (req, res, next) => {
        try{
            let data = req.body;

            //UPLOAD FILE IMG
            if(req.file){
                data.image = req.file;
            }    

            let validregister = await userSvc.validateRegister(data);

            //PASSWORD BCRYPT
            data.password = await bcrypt.hash(data.password, 10);

            //DB CONNECTION
            let response = await userSvc.registerUser(data);

            if(response){
            // FOR EMAIL
            sendMail({
                from: 'noreply@gmail.com',
                to: data.email, 
                subject: "ACCOUNT VERIFICATION", 
                text: "Your account has been registered", 
              });
            
            res.json({
                result: validregister, 
                status: true, 
                msg: "USER REGISTERED",
                meta: null
            })
             }else{
                throw "UNABLE TO REGISTER!!!"
             }
        }
        catch(err){
            next({status: 400, msg: err});
        }
    }

    //USER LOGIN
    getLoggedInUser = (req, res, next) => {
        res.json({
            result: req.authUser,
            status: 200, 
            msg: "YOUR PROFILE",
            meta: null
    })
    }
}

const authctrl = new AuthController;
module.exports = authctrl;