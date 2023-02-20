//TO DO LOGIN CHECK
const authCheck = (req, res, next) => {
    let loginSuccess = true;
    if(loginSuccess){
        next()
    } else {
        next({
            status: 401, 
            msg: "Unauthorized"
        })
    }
}

module.exports = authCheck;