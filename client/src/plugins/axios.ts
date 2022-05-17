import axios from 'axios'
import { requestUserRefreshToken } from '@/services/user'
import { getCookie, setCookie } from '@/assets/utils/cookie'

axios.defaults.headers = axios.defaults.headers || {}

// Add a request interceptor
// 请求拦截器，发送请求前进行的一些操作，例如：给每个请求加上token
axios.interceptors.request.use(
  function (config) {
    config.headers = config.headers || {}
    config.headers.accessToken = getCookie('accessToken') || ''
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

let isRefreshing = false // 标记是否正在刷新 token， 防止多次刷新token

// 添加响应拦截器，在接收到响应后进行的一些操作
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { config } = response
  if (response.data.code === 1001) {
    if (!isRefreshing) {
      isRefreshing = true
      // 刷新accessToken
      requestUserRefreshToken().then((data) => {
        const accessToken = data.data.mes
        setCookie('accessToken', accessToken, 60 * 60 * 1, 'localhost')
        if (config.headers) {
          delete config.headers.accessToken
          config.headers.accessToken = accessToken
        }
        return axios(config)
      }).catch(error => {
        console.log('error', error)
      }).finally(() => {
        isRefreshing = false
      })
    }
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

axios.defaults.baseURL = '/'
