const mongoose = require("../configuration/dbConfig");

const userSchema = new mongoose.Schema({
    fullName: String, 
    email: String, 
    password: String, 
    role:{type: String, enum:["admin","customer"], default: "customer"}



});

module.exports = mongoose.model("User", userSchema);