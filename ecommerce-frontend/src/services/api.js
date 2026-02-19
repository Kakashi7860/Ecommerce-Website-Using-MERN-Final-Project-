import axios from 'axios'

export const API = axios.create({
    baseURL: "http://localhost:5000/api"
})

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token")
    if (token) {
        req.headers.Authorization = token
    }
    return req
})

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)