const User = require("../models/user");
const bcrypt = require("bcrypt");//necessary for comparing passwords 
//this layers of codes is necessary to handle business logics like password checks and token generations 
const jwt = require("jsonwebtoken");//for jwt token generation 

async function loginUser(userData){//async function to handle user login 
    const {email, password} = userData; //extracts email and password fromt the user requrest 

    const user = await User.findOne({email});//searchers database for user with the specific email 
    if(!user) throw new Error("User not found");//if no user found throws error 

    const isValidPassword = await bcrypt.compare(password, user.password);//compares user entered password with the hashed password in the database 
    if(!isValidPassword) throw new Error("Invalid password");//if passwords does not match, throws error 


    const token = jwt.sign(//creates a jwt token with user info (id, email, role) signs with secret and expires within 1 hr 
        {id: user._id, email: user.email, role: user.role}, 
        process.env.JWT_SECRET, 
        {expiresIn: "1h"}
    );

    return {user, token};
}

module.exports = {loginUser};