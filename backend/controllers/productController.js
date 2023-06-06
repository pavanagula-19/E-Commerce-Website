const Product = require("../models/productModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHander = require("../utils/errorhander");
const ApiFeature = require("../utils/apifeatures");

//Create Product
exports.createProduct = catchAsyncError(
    async(req,res,next)=>{
        const product = await Product.create(req.body)
        res.status(201).json({
            success:true,
            product
        });
    })

//Get All Products
exports.getAllProducts = catchAsyncError(
    async (req, res)=>{
    const apiFeature = new ApiFeature(Product.find(), req.query).search();
    const product = await apiFeature.query; 
    res.status(200).json({
        success:true,
        product
    });
});
//Update Product
exports.updateProduct = catchAsyncError(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Products Not Found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
       new:true,
       runValidators:true,
       useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    });
});
//Delete Product ------Admin
exports.deleteProduct = catchAsyncError(async(req, res, next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Products Not Found"
        });
    }
    
    await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
        success:true,
        message: "Product Deleted sucessfully"
    });
});


//Get Product details
exports.getProductDetails = catchAsyncError(async(req, res, next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander())
    }
    res.status(200).json({
        success:true,
        product
    });
});
