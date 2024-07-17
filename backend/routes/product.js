const express = require('express');
const { getProduct, getSingleProduct, addProduct } = require('../controllers/productController');
const router = express.Router();



router.route('/products').get(getProduct)
router.route('/products/:id').get(getSingleProduct)
router.route('/products/add').post(addProduct)

module.exports = router