const jwt = require("jsonwebtoken");

function authenticateAdmin(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];


    if(!token) return res.status(401).json({message: "Access Denied!"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err) return res.status(403).json({message: "Invalid Token"});

        if(user.role !=="admin"){
            return res.status(401).json({message: "Admin access required"});
        }

        req.user = user; 
        next();
    });
}

module.exports = {authenticateAdmin};