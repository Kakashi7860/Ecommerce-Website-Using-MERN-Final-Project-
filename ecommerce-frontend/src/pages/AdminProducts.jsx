import React, { useState } from 'react'
import { API } from '../services/api'

function AdminProducts() {
    const [form,setForm] = useState({
        name:"",
        price:"",
        image:"",
        description:""
    })

    const handleChange = (e)=>{
        setForm({...form,[e.target.name]:e.target.value})

    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        await API.post("/products/add",form)
        alert("Product Added")
    }


  return (
    <div className='container mt-4'>
    <h2>Add Product</h2>
    <form onSubmit={handleSubmit}>
    <input className='form-control mb-2' name='name' placeholder='Product Name' onChange={handleChange} />
    <input className='form-control mb-2' name='price' placeholder='Price' onChange={handleChange} />
    <input className='form-control mb-2' name='image' placeholder='Image URL' onChange={handleChange} />
    <textarea className='form-control mb-2' name='description' placeholder='Description'></textarea>

    <button className='btn btn-primary'>Add Product</button>
    </form>

    </div>
    

  )
}

export default AdminProducts