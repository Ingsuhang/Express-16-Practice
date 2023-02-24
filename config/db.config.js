const mongoose = require("mongoose");
const AppConstant = require("./constant");

//MONGOOSE DB CONNECTIONS
mongoose.set('strictQuery', false);
mongoose.connect(AppConstant.DATABASE.URL, (err) => {
    if(!err){
        console.log("DB CONNECTED SUCESSFULLY!")
    }
})