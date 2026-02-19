const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/products', productRoutes)
app.use('/api/auth',authRoutes)

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.send("API RUNNING")
})

app.listen(5000,()=>{
    console.log("Server is running at 5000")
})