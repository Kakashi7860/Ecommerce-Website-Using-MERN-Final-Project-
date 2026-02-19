import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"

function Cart() {

    const { cart, increaseQty, decreaseQty } = useContext(CartContext)
    const navigate = useNavigate()

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    )

    return (
        <div className="container mt-4" style={{ maxWidth: '800px' }}>
            <h2 className="mb-4">Shopping Cart</h2>

            {cart.length === 0 && <p>Your cart is empty.</p>}

            {cart.map(item => (
                <div key={item._id} className="card mb-3 shadow-sm border-0">
                    <div className="row g-0 align-items-center">
                        <div className="col-md-2 p-2">
                            <img src={item.image || "https://via.placeholder.com/150"} className="img-fluid rounded-start" alt={item.name} style={{ height: '80px', objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-10">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title mb-1">{item.name}</h5>
                                    <p className="card-text text-muted mb-0">${item.price}</p>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <button
                                        className="btn btn-sm btn-outline-secondary rounded-circle"
                                        onClick={() => decreaseQty(item._id)}
                                        style={{ width: '30px', height: '30px', padding: 0 }}
                                    >-</button>

                                    <span style={{ fontWeight: 'bold' }}>{item.qty}</span>

                                    <button
                                        className="btn btn-sm btn-outline-secondary rounded-circle"
                                        onClick={() => increaseQty(item._id)}
                                        style={{ width: '30px', height: '30px', padding: 0 }}
                                    >+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {cart.length > 0 && (
                <div className="card mt-4 p-3 border-0 shadow-sm bg-light">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Total: ${total.toFixed(2)}</h4>
                        <button className="btn btn-primary btn-lg" onClick={() => navigate('/payment')}>
                            Proceed to Pay
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart
