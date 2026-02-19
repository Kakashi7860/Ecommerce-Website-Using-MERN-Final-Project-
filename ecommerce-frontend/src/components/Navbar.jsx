import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { cart } = useContext(CartContext)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar-custom">
      <Link to="/" className="navbar-brand">
        LuxeMarket
      </Link>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search for premium products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="nav-links">
        {user ? (
          <div className="nav-item" style={{ cursor: 'pointer' }}>
            <span>Hi, {user.name}</span>
          </div>
        ) : (
          <Link to="/login" className="nav-item">
            Sign In
          </Link>
        )}

        {user && user.role === 'admin' && (
          <Link to="/admin" className="nav-item" style={{ color: '#ef4444' }}>
            Admin
          </Link>
        )}

        <Link to="/cart" className="nav-item cart-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </Link>

        {user && (
          <button onClick={handleLogout} className="btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: '#374151', color: '#fff', boxShadow: 'none' }}>
            Logout
          </button>
        )}
        {!user && (
          <Link to="/register">
            <button className="btn-primary">Get Started</button>
          </Link>
        )}
      </div>
    </nav>
  )
}
