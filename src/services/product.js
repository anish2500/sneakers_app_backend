const Product = require("../models/product");

async function createProduct(productData){
    const product = new Product(productData); 
    const savedProduct = await product.save();
    return savedProduct; 
}

async function getAllProducts(filters = {}){
    const query = {};
    if(filters.category){
        query.category = filters.category; 
    }
    if(filters.brand){
        query.brand = filters.brand; 
    }
    if (filters.colors && filters.colors.length >0){
        query.colors = {$in: filters.colors};
    }

    if(filters.sizes && filters.sizes.length > 0){
        query.sizes = { $in: filters.sizes};
    }

    const products = await Product.find(query);
    return products; 
}


async function getProductById(id){
    const products = await Product.findById(id);
    return products; 
}

async function updateProduct(id, productData){
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {new: true});
    return updatedProduct;

}
async function deleteProduct(id){
    const deletedProduct = await Product.findByIdAndDelete(id);
    return deletedProduct; 
}

module.exports = {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct};