import { useState } from "react"
import { API } from "../services/api"
import { useNavigate } from "react-router-dom"

function Register() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        await API.post("/auth/register", form)

        alert("Registered Successfully")
        navigate("/login")
    }

    return (
        <div className="container mt-4">
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-2"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    className="form-control mb-2"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <button className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register
