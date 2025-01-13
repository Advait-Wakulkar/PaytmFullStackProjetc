const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://admin:Adv%4019082001@cluster0.gfjr4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const userSchema = new mongoose.Schema({
    username : {type : String, required : true},
    firstName :{type : String, required : true},
    lastName : {type : String, required : true},
    password : {type : String, required : true}
})

const User = new mongoose.model("User", userSchema)

const accountSchema = new mongoose.Schema({
    userId : {type : Schema.Types.ObjectId, ref : "User", required : true},
    balance : {type : Number, required : true}
})

const Account = new mongoose.Schema("Account", accountSchema)

module.exports = {
    User, Account
}