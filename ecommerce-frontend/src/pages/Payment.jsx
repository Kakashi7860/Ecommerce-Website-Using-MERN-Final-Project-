import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

export default function Payment() {
    const navigate = useNavigate()
    const { clearCart } = useContext(CartContext)
    const [loading, setLoading] = useState(false)

    const handlePayment = (e) => {
        e.preventDefault()
        setLoading(true)
        // Simulate payment processing
        setTimeout(() => {
            setLoading(false)
            alert("Payment Successful! Tracking your order now.")
            if (clearCart) clearCart()
            navigate('/tracking')
        }, 2000)
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <div className="card shadow-lg p-4">
                <h2 className="text-center mb-4">Secure Checkout</h2>
                <form onSubmit={handlePayment}>
                    <div className="mb-3">
                        <label className="form-label">Card Number</label>
                        <input type="text" className="form-control" placeholder="0000 0000 0000 0000" required />
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label className="form-label">Expiry Date</label>
                            <input type="text" className="form-control" placeholder="MM/YY" required />
                        </div>
                        <div className="col">
                            <label className="form-label">CVV</label>
                            <input type="password" className="form-control" placeholder="123" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Cardholder Name</label>
                        <input type="text" className="form-control" placeholder="John Doe" required />
                    </div>
                    <button type="submit" className="btn btn-success w-100" disabled={loading}>
                        {loading ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
            </div>
        </div>
    )
}
