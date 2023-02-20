const Joi = require('joi');

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
}

const userSvc = new UserService;
module.exports = userSvc;
