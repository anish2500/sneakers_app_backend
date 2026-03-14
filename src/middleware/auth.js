const jwt = require("jsonwebtoken");//for import 
//this layers of codes is necessary for protecting routes by verifying the service generated jwt tokens 

function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"]; //gets the auth header from the HTTP request 
    const token = authHeader && authHeader.split(" ")[1]; //extracts the token from the headers 


    if(!token) return res.status(401).json({message: "Access Denied"});//if user does not have token access is denied 

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{//this is to verify if the token is valid or not this is also a payload 
        if(err) return res.status(403).json({message: "Invalid Token"});
        req.user = user; //stores the user data from the token inside the req
        next();
    });
}

module.exports = {authenticateToken};