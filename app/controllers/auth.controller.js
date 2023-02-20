const userSvc = require("../services/user.service");
const bcrypt = require("bcryptjs");

class AuthController{
    //LOGIN PROCESS
    loginProcess = async (req, res, next) => {
        try{
            //API FROM USER BODY
            let data = req.body;
            let validlogin = await userSvc.validateLogin(data);
            //CREATING MANUAL ENCRYPT PASS AND TESTING
            let user = {
                _id: 1, 
                name: "Insang Limbu",
                email: "Insang@gmail.com",
                password: "$2a$10$c0mHEVN0RAGw1XfX7p2M5.6hxzjrlt3Ss3kHYY3dpArTaIyI.ZOyi",
                role: "admin",
                status: "active",
                address: "Kathmandu",
                phone: "+977 9801234567"
            }
            if(bcrypt.compareSync(data.password,user.password)){
                res.json({result:user})
            }
            res.json(validlogin);
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
            
            res.json({
                result: validregister, 
                status: true, 
                msg: "USER REGISTERED",
                meta: null
            })
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