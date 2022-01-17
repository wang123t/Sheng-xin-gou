/* 
对axios进行二次包装
1. 配置通用的基础路径和超时
2. 显示请求进度条
3. 成功返回的数据不再是response, 而直接是响应体数据response.data
4. 统一处理请求错误, 具体请求也可以选择处理或不处理
*/
import axios from 'axios'


//当前模块引入store
import store from '@/store'
import NProgress from 'nprogress'//引入进度条
import 'nprogress/nprogress.css'
NProgress.configure({parent:'.header'})//parent：指定此选项以更改父容器（默认：body）
NProgress.configure({ showSpinner: false })//显示水平进度条

//创建一个axios实例
const service = axios.create({
    baseURL: '/api',//基础路径
    timeout: 10000,//请求超时时间 
})
//请求拦截器
service.interceptors.request.use((config) => {
    //需要临时id
    if (store.state.detail.nanoid_token) {
         config.headers.userTempId = store.state.detail.nanoid_token
    }
    //需要携带token给服务器验证登录信息
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    //进度条开始
    NProgress.start()

    //返回配置对象
    return config
})
//响应拦截器
service.interceptors.response.use((response) => {
    //进度条结束
    NProgress.done()
    //返回响应体数据
    return response.data
}, (error) => {
    //隐藏进度条
    NProgress.done()
    //统一处理错误
    alert(`请求出错: ${error.message || '未知错误'}`)
    return Promise.reject(error)
})
export default service
