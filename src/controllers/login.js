const userService = require("../services/login");

//this files of codes are necessary for handling http request/response, calls services 
async function loginUser(req, res){//handler function with requrest and response 
    try{//try catch block for proper error handling 
        const userData = req.body; //gets json data from the requrest body
        const result = await userService.loginUser(userData);//calls service to process login 
        res.status(200).json({message: "Login successful", ...result});//returns success response along with the tokens 
    }catch (error){
        res.status(400).json({message: error.message});
    }
}

module.exports = {loginUser};