import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'

export default function Navbar() {

    const {cart} = useContext(CartContext)

  return (
    <nav className='navbar navbar-dark bg-dark px-4'>

        <Link to="/" className='navbar-brand'>
        E-Commerce Store
        </Link>
        <Link to="/cart" className='btn btn-warning'>
        Cart({cart.lenght})
        </Link>
    </nav>
  )
}
