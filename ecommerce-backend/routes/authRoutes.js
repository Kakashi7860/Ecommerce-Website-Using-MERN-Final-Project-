const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        })
        await user.save()
        res.status(201).json({ message: "User Registered Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) return res.status(400).json({ message: "User Not Found" })

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch)
            return res.status(400).json({ message: "Wrong Password" })

        const token = jwt.sign(
            { id: user._id, role: user.role },
            "secretkey",
            { expiresIn: "1d" }
        )

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
})

module.exports = router