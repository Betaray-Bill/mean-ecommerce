const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

exports.createOrder = async(req, res, next) => {
    console.log(req.body)
    const cartItems = await req.body;
    const amount = Number(cartItems.reduce((acc, curr) =>
        acc + (curr.products.price * curr.qty), 0)).toFixed(2)
    console.log(amount)
    const status = 'pending'
    await orderModel.create({
        cartItems,
        amount,
        status
    })

    // Updating prod stock
    cartItems.forEach(async(item) => {
        console.log(item)
        const product = await productModel.findById(item.products._id.$oid)
        product.stock = product.stock - item.qty
        await product.save()
    });

    res.json({
        success: true,
        message: 'Order created successfully',
        order: 'Order Works'
    })
}