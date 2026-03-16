const jwt = require("jsonwebtoken");

function authenticateCustomer(req, res, next){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401).json({message: "Please login to view products"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err) return res.status(403).json({message: "Invalid Token"});

        if(user.role !=="customer" && user.role !=="admin"){
            return res.status(403).json({message: "Access denied"});
        }
        req.user = user; 
        next();
        
    });
}

module.exports = {authenticateCustomer};