const express  = require("express");
require("./configuration/dbConfig");

const app = express();
const PORT = process.env.PORT || 5000; 

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})