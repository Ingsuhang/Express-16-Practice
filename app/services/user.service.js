const Joi = require('joi');
const { MongoClient } = require('mongodb');

//USER VALIDATION USING JOI
class UserService {
    validateLogin = async (data) => {
        try{
            let loginValidationschema = Joi.object({
                username: Joi.string().required(),

                password: Joi.string().required(),
            })
            let validateddata = await loginValidationschema.validateAsync(data);
            return validateddata;
        }
        catch(err){
            let msg = err.details[0].message;
            throw msg
        }
    }

    validateRegister = async (data) => {
        try{
            let RegisterScheme =  Joi.object({
                name: Joi.string().required().min(3),
                email: Joi.string().email().required(),
                password: Joi.string().min(8).max(20).required(),
                address: Joi.string().empty(),
                phone: Joi.string().empty(),
                role: Joi.string().allow("admin",'supplier','customer').empty().default("customer"),
                status: Joi.string().allow("active",'inactive').default("inactive"),
                image: Joi.string().empty().default(null)
            });
            let validatedata = await RegisterScheme.validateAsync(data);
            return validatedata;
        }
        catch(err){
          let msg = err;
          throw msg;
        }
    }

    registerUser = async (data) => {
        try{
            //connect
            let client = await MongoClient.connect("mongodb://127.0.0.1:27017");

            //select db
            let db = client.db("express-16");
                        
            // query
            let response = await db.collection("users").insertOne(data)
            return response;
        }
        catch(err){
            throw err;
        }
    }
}

const userSvc = new UserService;
module.exports = userSvc;
