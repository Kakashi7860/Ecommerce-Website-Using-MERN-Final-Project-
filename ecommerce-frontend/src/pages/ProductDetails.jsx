import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { API } from '../services/api'
import { CartContext } from '../context/CartContext'

export default function ProductDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToCart } = useContext(CartContext)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        API.get(`/products`) // Optimally we should have a get-by-id endpoint, fetching all for now or I can add a dedicated endpoint.
            // The previous backend code only had "/" (get all) and "/add" (add product). 
            // I should probably add a get-by-id endpoint to backend for better practice, but filtering client side works for small datasets.
            .then(res => {
                const found = res.data.find(p => p._id === id)
                setProduct(found)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, [id])

    if (loading) return <div className="text-center mt-5">Loading...</div>
    if (!product) return <div className="text-center mt-5">Product not found</div>

    return (
        <div className="container mt-5">
            <button className="btn btn-outline-dark mb-4" onClick={() => navigate(-1)}>← Back</button>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <img
                        src={product.image || "https://via.placeholder.com/400"}
                        alt={product.name}
                        className="img-fluid rounded shadow-sm"
                        style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
                    />
                </div>
                <div className="col-md-6">
                    <h1 className="mb-3">{product.name}</h1>
                    <div className="mb-3">
                        <span className="badge bg-warning text-dark me-2">Best Seller</span>
                        <span className="text-warning">★★★★☆ (124 reviews)</span>
                    </div>
                    <h2 className="text-primary mb-4">${product.price}</h2>
                    <p className="lead text-muted mb-4">{product.description || "No description available."}</p>

                    <div className="d-grid gap-2">
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={() => {
                                addToCart(product)
                                alert("Added to cart!")
                            }}
                        >
                            Add to Cart
                        </button>
                        <button className="btn btn-outline-secondary btn-lg">Add to Wishlist</button>
                    </div>

                    <div className="mt-4">
                        <h5>Product Features:</h5>
                        <ul>
                            <li>High quality materials</li>
                            <li>Fast shipping available</li>
                            <li>2 year warranty included</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
