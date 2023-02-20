const express = require("express");
const app = express();
const authctrl = require("../app/controllers/auth.controller");
const authCheck = require("../app/middleware/auth.middleware");
const uploader = require("../app/middleware/uploader.middleware");


//USING AUTHCONTROLLER IN ROUTES & UPLOADER MULTER
app.post("/login", authctrl.loginProcess)
app.post("/register",uploader.single('image'), authctrl.registerProcess)

//CHECKING IF USER IS LOG IN OR NOT USING MIDDLEWARE
app.get("/me",authCheck, authctrl.getLoggedInUser)

module.exports = app;