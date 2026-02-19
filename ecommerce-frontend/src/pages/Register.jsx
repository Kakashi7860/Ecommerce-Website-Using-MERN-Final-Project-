import { useState } from "react"
import { API } from "../services/api"
import { useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
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
            await API.post("/auth/register", form)
            alert("Registered Successfully")
            navigate("/login")
        } catch (error) {
            alert(error.response?.data?.message || "Registration Failed")
        }
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
                    required
                />
                <input
                    className="form-control mb-2"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <select
                    className="form-control mb-2"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register
