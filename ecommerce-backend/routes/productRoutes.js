const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware')

// Only admin can add products
router.post("/add", verifyAdmin, async (req, res) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send({ message: "Error adding product", error })
    }
})

// Only registered users can view products
router.get('/', verifyToken, async (req, res) => {
    try {
        const products = await Product.find()
        res.send(products)
    } catch (error) {
        res.status(500).send({ message: "Error fetching products", error })
    }
})

module.exports = router