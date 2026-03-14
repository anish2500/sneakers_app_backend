const User = require("../models/user");

const bcrypt = require("bcrypt");

async function createUser(userData){
    const {fullName, email, password} = userData; 
    const hashedPassword =  await bcrypt.hash(password, 10);

    const createdUser  = new User({
        fullName, 
        email, 
        password: hashedPassword, 
        role: "customer"

    });

    const savedUser = await createdUser.save();
    return savedUser; 
}

module.exports= {createUser};