import axios from "axios"
import router from "../router/router"

const axiosService = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    }
})

axiosService.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = token
    }
    return config
}, error => {
    return Promise.reject(error)
})

axiosService.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    } else {
        return Promise.reject(new Error(response.data.code + '' + response.data.msg || 'Error'))
    }
}, error => {
    if (error.response.status === 401 || error.response.status === 403) {
        console.error('reset login');
        localStorage.removeItem('token')
        router.push("/login")
    }
    return Promise.reject(error)
})

export default axiosService