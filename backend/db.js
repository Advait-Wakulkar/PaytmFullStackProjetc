const mongoose = require("mongoose")
const { Schema } = require("zod")

mongoose.connect("mongodb+srv://admin:Adv%4019082001@cluster0.gfjr4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const userSchema = new mongoose.Schema({
    username : {type : String, required : true},
    firstName :{type : String, required : true},
    lastName : {type : String, required : true},
    password : {type : String, required : true}
})

const accountSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true},
    balance : {type : Number, required : true}
})

const User = new mongoose.model("User", userSchema)
const Account = new mongoose.model("Account", accountSchema)

module.exports = {
    User, Account
}