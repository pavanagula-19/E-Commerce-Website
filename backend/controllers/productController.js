const Product = require("../models/productModel")

//Create Product
exports.createProduct = async(req,res,next)=>{
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
};

//Get All Products
exports.getAllProducts = async (req, res)=>{
    const product = await Product.find();
    res.status(200).json({
        success:true,
        product
    })
}
//Update Product
exports.updateProduct = async(req,res,next)=>{
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
    })
}

//Delete Product ------Admin
exports.deleteProduct = async(req, res, next)=>{
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
    })
}


//Get All Products
exports.getProductDetails = async(req, res, next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success:false,
            message:"Product Not Found"
        })
    }
    res.status(200).json({
        success:true,
        product
    })
}
