const productService = require("../services/product");

async function createProduct(req, res){
    try{
        const productData = {
            ...req.body, 
            colors: req.body.colors ? JSON.parse(req.body.colors) : [], 
            sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [], 
            price: Number(req.body.price), 
            shoesImage: req.file ? `/uploads/${req.file.filename}` : ""
        };
        const product = await productService.createProduct(productData);
        res.status(201).json({ product, message: "Product create successfully."});
    }catch (error){
        res.status(400).json({ message: error.message});
    }
}

async function getAllProducts(req, res){
    try{
        const {category, brand, colors, sizes} = req.query; 

        const filters = {};
        if(category) filters.category = category; 
        if(brand) filters.brand = brand; 
        if(colors) filters.colors = colors.split(",");
        if(sizes) filters.sizes = sizes.split(",");

        const products = await productService.getAllProducts(filters);
        res.status(200).json(products);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

async function getProductById(req, res){
    try {
        const product = await productService.getProductById(req.params.id); 
        if(!product) return res.status(404).json({message: "Product not found!"});
        res.status(200).json(product);
    }catch (error){
        res.status(400).json({message: error.message});
    }
}

async function updateProduct(req, res){
    try{
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        if(!updatedProduct) return res.status(404).json({message: "Product not found"});
        res.status(200).json({product: updatedProduct, message: "Product updated successfully."});
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

async function deleteProduct(req, res){
    try{
        const deletedProduct  = await productService.deleteProduct(req.params.id);
        if(!deletedProduct) return res.status(404).json({message: "Product not found"});
        res.status(200).json({message: "Product deleted successfully"});
    }catch (error){
        res.status(400).json({message: error.message});
    }
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct};