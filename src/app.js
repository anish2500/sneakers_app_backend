const express  = require("express");
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const productRoute = require("./routes/product");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./configuration/dbConfig");

const app = express();
const PORT = process.env.PORT || 5000; 

app.use(bodyParser.json());
app.use('/user', signupRoute);
app.use('/user', loginRoute);
app.use('/product', productRoute);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})