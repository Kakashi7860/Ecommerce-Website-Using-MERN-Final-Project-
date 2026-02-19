import React, { useContext, useEffect, useState } from 'react';
import { API } from '../services/api';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '50px', height: '50px', border: '5px solid #f3f3f3', borderTop: '5px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <h2 style={{ color: '#6b7280' }}>Loading Collections...</h2>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div>
      {/* Modern Hero Section */}
      <div className="hero-wrapper">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Discover the Extraordinary.</h1>
            <p className="hero-subtitle">Curated collections for the modern lifestyle. Shop the latest trends in technology, fashion, and home aesthetics.</p>
            <a href="#products" className="hero-btn">Shop Now</a>
          </div>
          {/* Abstract circles for decoration */}
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '400px', height: '400px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        </div>
      </div>

      {/* Modern Product Grid */}
      <div id="products">
        <h2 className="section-title">Trending Now</h2>
        <div className="products-grid">
          {products.map(product => (
            <div className="product-card" key={product._id}>
              <div className="product-image-container" style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product._id}`)}>
                <img
                  src={product.image || "https://via.placeholder.com/400"}
                  alt={product.name}
                  className="product-image"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/400?text=Premium+Product" }}
                />
              </div>
              <div className="product-details">
                <div className="product-category">Premium Choice</div>
                <h3 className="product-title" title={product.name} style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product._id}`)}>{product.name}</h3>

                <div className="product-price-row">
                  <div className="price">${product.price}</div>
                  <button className="add-cart-btn" onClick={() => {
                    addToCart(product);
                    alert("Added to cart!");
                  }} title="Add to Cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Support</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="footer-copy">
          © {new Date().getFullYear()} LuxeMarket. All rights reserved. Designed for excellence.
        </div>
      </footer>

    </div>
  );
}

export default Home;