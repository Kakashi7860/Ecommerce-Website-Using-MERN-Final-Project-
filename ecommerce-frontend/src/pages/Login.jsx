import { useState } from "react"
import { API } from "../services/api"
import { useNavigate } from "react-router-dom"

function Login() {

    const navigate = useNavigate()

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

        const res = await API.post("/auth/login", form)

        localStorage.setItem("token", res.data.token)

        alert("Login Successful")
        navigate("/")
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
