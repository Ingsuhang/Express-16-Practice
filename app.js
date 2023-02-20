const express = require("express");
const errorhandle = require("./app/middleware/errorhandler.middleware");
const app = express();

//BODY PARSER
app.use(express.json());
app.use(express.urlencoded({
    extended: false
})) 

//USING ROUTES
const routes = require("./routes/index")
app.use("/api/v1",routes);

//404 NOT FOUND
app.use((req, res, next) => {
    res.status(404).send("404 NOT FOUND");
});

//ERROR HANDLER
app.use(errorhandle);

//MAKING SERVER FOR CONNECTIONS
app.listen(3005, "localhost", (err) => {
    if(err) {
        console.log("Error listening to port 3005");
    } else {
        console.log("Server is running on port 3005");
        console.log("Press CTR+C to end the server...");
    }
})