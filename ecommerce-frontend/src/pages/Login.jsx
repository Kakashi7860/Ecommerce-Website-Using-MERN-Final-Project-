import { useState } from "react"
import { API } from "../services/api"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const [form, setForm] = useState({
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
        try {
            const res = await API.post("/auth/login", form)
            login(res.data.user, res.data.token) // Update context with user and token
            alert("Login Successful")
            if (res.data.user.role === 'admin') {
                navigate("/admin")
            } else {
                navigate("/")
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login Failed")
        }
    }

    return (
        <div className="container mt-4">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button className="btn btn-success">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login
