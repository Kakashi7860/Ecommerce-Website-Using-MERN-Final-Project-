import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'

function Cart() {
  const {cart, removeFromCart} = useContext(CartContext)
  const total = cart.reduce((sum,item)=>sum+Number(item.price),0)
  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item,index)=>(
        <div key ={index} className='border p-2 mb-2'>

          <h5>{item.name}</h5>
          <p>₹{item.price}</p>

          <button className='btn btn-danger btn-sm' onClick={()=>removeFromCart(index)}>Remove</button>

        </div>  

      ))}
      <h4>Total: ₹ {total}</h4>

    </div>
  )
}

export default Cart