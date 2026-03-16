const mongoose = require('../configuration/dbConfig');

const productSchema = new mongoose.Schema({
    shoesName: {type: String, required: true}, 
    brand: {
        type: String, 
        enum: ["New Balance", "Adidas", "Nike", "Converse", "Puma"], 
        required: true, 
    }, 
    price: {type: Number, required: true}, 
    description: { type: String, required: true}, 
    category: {
        type: String, 
        enum: ["Running","Casual", "Sports", "Limited"], 
        required: true, 
    }, 
    colors: [{
        type: String, 
        enum: ["Black", "Red", "White", "Grey", "Green"]
    }], 
    sizes: [{
        type: String, 
        enum: ["US7", "US8", "US9", "US10", "US11", "US12"]
    }], 
    shoesImage: {type: String}, 
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Product", productSchema);