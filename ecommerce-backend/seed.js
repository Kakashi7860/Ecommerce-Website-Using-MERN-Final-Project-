const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
    {
        name: "Premium Noise-Cancelling Headphones",
        price: 299.99,
        description: "Immerse yourself in crystal-clear sound with our top-tier noise-cancelling headphones. Perfect for travel, work, and relaxation.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        name: "Smart Fitness Watch Series 5",
        price: 199.50,
        description: "Track your workouts, monitor your health, and stay connected with the latest Smart Fitness Watch. Water-resistant and durable.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        name: "Ergonomic Mechanical Keyboard",
        price: 129.00,
        description: "Boost your productivity and typing speed with this customizable mechanical keyboard. Features RGB lighting and tactile switches.",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b91a603?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        name: "4K Ultra HD Action Camera",
        price: 349.00,
        description: "Capture your adventures in stunning 4K resolution. Waterproof, shockproof, and ready for any environment.",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        name: "Minimalist Leather Backpack",
        price: 89.99,
        description: "A stylish and durable backpack for your daily commute. Made from genuine leather with ample storage for your laptop and essentials.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        name: "Smart Home Speaker",
        price: 79.99,
        description: "Control your smart home, play music, and get answers with this voice-activated smart speaker. Compact design with powerful sound.",
        image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        name: "Designer Sunglasses",
        price: 150.00,
        description: "Protect your eyes in style with these premium designer sunglasses. UV protection and scratch-resistant lenses.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    {
        name: "Professional DSLR Camera",
        price: 1299.00,
        description: "Take professional-quality photos and videos. Includes lens kit and carrying case.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to DB");

        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products");

        // Insert new products
        await Product.insertMany(products);
        console.log("Added new products");

        mongoose.connection.close();
        console.log("Done");
    } catch (err) {
        console.error(err);
    }
};

seedDB();
