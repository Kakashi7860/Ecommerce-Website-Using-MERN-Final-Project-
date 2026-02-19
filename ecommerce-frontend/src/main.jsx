import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>
)
