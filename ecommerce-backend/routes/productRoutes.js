const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.post("./add",async(req,res)=>{
    const product = new Product(req.body)
    await product.save()
    res.send(product)
})

router.get('/',async(req,res)=>{
    const products = await Product.find()
    res.send(products)
})
module.exports=router