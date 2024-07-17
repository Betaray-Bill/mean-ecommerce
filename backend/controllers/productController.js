const ProductModel = require("../models/productModel")

exports.getProduct = async(req, res, next) => {
    // query based search
    const query = req.query.keyword ? {
        name: {
            $regex: req.query.keyword, // searches for the word in query
            $options: 'i' // case insensitive search
        }
    } : {}

    const products = await ProductModel.find(query)

    res.json({
        success: true,
        products
    })
}


exports.getSingleProduct = async(req, res, next) => {
    console.log(req.params.id)
    const product = await ProductModel.findById(req.params.id)
    res.json({
        success: true,
        product
    })
}

// Add Product
exports.addProduct = async(req, res, next) => {
    const { name, price } = req.body;
    console.log(name, price)
    try {
        console.log(name, price)
        const product = new ProductModel({ name, price })
        await product.save();

    } catch (err) {
        console.log(err.message)
        res.json({
            success: false,
            message: 'NO Product added successfully'
        })
    }
    res.json({
        success: true,
        message: 'Product added successfully'
    })
}