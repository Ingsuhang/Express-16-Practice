const {MongoClient} = require("mongodb");
const AppConstant = require("../../config/constant");

//CONNECTION OF MONGODB 
class MongoDBService {
    db;
    constructor(){

        this.connect()

    }

    connect = async() => {
        try{
            let client = await MongoClient.connect(AppConstant.DATABASE.URL);
            this.db = client.db(AppConstant.DATABASE.NAME);
        }
        catch(err){
            throw err
        }
    }
}
module.exports = MongoDBService;