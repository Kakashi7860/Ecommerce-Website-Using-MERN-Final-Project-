import React, { useEffect, useState } from 'react'
import { API } from '../services/api'

function Home() {
  const [products,setProducts] = useState([])

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

          </div>
        ))}


    </div>
  )
}

export default Home