const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/sneakers_app_db";

mongoose.connect(MONGO_URI);

mongoose.connection.on("connected", ()=>{
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err)=>{
    console.log(`MongoDB connection failed!:${err}`);
});

module.exports = mongoose; 