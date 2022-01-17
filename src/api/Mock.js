//请求mock接口的axios封装
import axios from "axios";

const mockAjax = axios.create({
    baseURL: '/mock',//基础路径前缀
    timeout: 5000
})
mockAjax.interceptors.request.use((config) => {
    return config;
})

mockAjax.interceptors.response.use((response) => {
    return response.data
}, (error) => {
    return Promise.reject(error)
})

export default mockAjax