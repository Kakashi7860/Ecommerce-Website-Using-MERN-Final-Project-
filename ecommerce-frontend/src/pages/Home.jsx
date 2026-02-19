import React, { useContext, useEffect, useState } from 'react'
import { API } from '../services/api'
import { CartContext } from '../context/CartContext'


function Home() {
  const [products,setProducts] = useState([])
  const {addToCart} = useContext(CartContext)

  useEffect(()=>{
    API.get("/products")
    .then(res=>setProducts(res.data))
  },[])

return (
    <div className='container mt-4'>
        <h2>Products</h2>
        {products.map(p=>(
          <div key={p._id}>
            <h4>{p.name}</h4>
            <p>{p.price}</p>
            <button className='btn btn-success' onClick={()=> addToCart(p)}>Add To Cart</button>

          </div>
        ))}

     

    </div>
  )
}

export default Home