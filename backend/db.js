const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://admin:Adv%4019082001@cluster0.gfjr4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const userSchema = new mongoose.Schema({
    username : String,
    firstName : String,
    lastName : String,
    password : String
})

const User = new mongoose.model("User", userSchema)

module.exports = {
    User
}