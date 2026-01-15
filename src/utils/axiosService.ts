import axios from "axios"

const axiosService = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    }
})

// axiosService.interceptors.request.use(config => {
    // const token = localStorage.getItem('token')
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`
    // }
    // if (config.method === 'get') {
    //     config.params = {
    //         ...config.params,
    //         t: Date.now()
    //     }      
    // }
    // if(config.showLoading != false){
    //     showLoading()
    // }
//     return config
// }, error => {
//     return Promise.reject(error)
// })

axiosService.interceptors.response.use(response => {
    // hideLoading()
    const res = response.data
    if(res.code === "200"){
        return res
    } else {
        // handleBusinessError(res.code, res.message)
        return Promise.reject(new Error(res.msg || 'Error'))
    }
}, error => {
    // hideLoading()
    // handleError(error)
    return Promise.reject(error)
})

export default axiosService