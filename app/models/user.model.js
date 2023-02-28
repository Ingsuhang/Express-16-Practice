const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
    houseNo: String,
    wardNo: Number,
    streetName: String,
    stateName: {type: String, enum:["State 1", "Madhesh State",'Bagmati State',"Gandaki State","Lumbini State","Karnali State",'Far western State']},
    lati: Number,
    long: Number
})

const UserSchemaDef = new mongoose.Schema({
    //  name:Sandesh Bhattarai
    name: {
        type: String,
        require: true,
        min: 3,
        //max: 30
    },
    // email:sandesh+1@broadwayinfosys.com
    email: {
        type: String,
        require: true, 
        unique: true
    },
    // password:admin123
    password: {
        type: String, 
        require: true
    },
    // role:admin
    role:{
        type: String,
        enum: ["admin",'seller','customer'],
        default: "customer"
    },
    // status:active
    status: {
        type: String, 
        enum: ['active','inactive'],
        default: "inactive"
    },
    // address:Kathmandu
    address: {
        perm: AddressSchema,
        temp: AddressSchema
    },
    // phone:+977 9801234567
    phone: String,
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, {
    autoCreate: true,
    autoIndex: true,
    timestamps: true
});

// Role, roles
// const Role ={
//     _id, 
//     name
// }

// String, Boolean, Number, ObjectId, Date, Array, Object
const UserModel = mongoose.model("User", UserSchemaDef)
module.exports = UserModel;