// ERROR HANDLING MIDDLEWARE
const errorhandle = ((error, req, res, next) => {
    let statuserr = error.status || 400;
    let msg = error.msg || error;
    
    res.status(statuserr).json({
        result: null, 
        msg: msg,
        status: false,
        meta: null
    })
})

module.exports = errorhandle;