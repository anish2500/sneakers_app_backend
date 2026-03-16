const express = require("express");
const multer = require("multer");
const productController = require("../controllers/product");

const {authenticateAdmin} = require("../middleware/adminAuth");
const {authenticateCustomer} = require("../middleware/customerAuth");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/");
    }, 
    filename: (req, file, cb) =>{
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({storage});

router.post("/create-product", authenticateAdmin, upload.single("shoesImage"), productController.createProduct);

router.get("/get", authenticateCustomer, productController.getAllProducts);

router.get("/getById/:id", authenticateCustomer,  productController.getProductById);

router.put("/updateById/:id", authenticateAdmin, productController.updateProduct);
router.delete("/deleteById/:id", authenticateAdmin, productController.deleteProduct);

module.exports = router; 
