import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Cart(){

    const { cart, increaseQty, decreaseQty } = useContext(CartContext)

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    )

    return(
        <div className="container mt-4">
            <h2>Your Cart</h2>

            {cart.length === 0 && <p>No items in cart</p>}

            {cart.map(item=>(
                <div key={item._id} className="border p-3 mb-2">
                    <h5>{item.name}</h5>
                    <p>₹ {item.price}</p>

                    <div className="d-flex align-items-center gap-2">
                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={()=>decreaseQty(item._id)}
                        >-</button>

                        <span>{item.qty}</span>

                        <button
                            className="btn btn-sm btn-secondary"
                            onClick={()=>increaseQty(item._id)}
                        >+</button>
                    </div>
                </div>
            ))}

            <h4>Total: ₹ {total}</h4>
        </div>
    )
}

export default Cart
