import axios, { AxiosResponse } from 'axios'
// axios.defaults.baseURL = process.env.VUE_APP_URL
// axios.defaults.withCredentials = true
// console.log('axios.defaults.baseURL', axios.defaults)

// 注册
export function requestUserRegister (data: Record<string, any>): Promise<AxiosResponse> {
  return axios({
    method: 'post',
    url: '/api/userRegister',
    data
  })
}

// 登录
export function requestUserLogin (data: Record<string, any>): Promise<AxiosResponse> {
  return axios({
    method: 'post',
    url: '/api/userLogin',
    data
  })
}

// 验证用户登录态
export function requestValidateUser (): Promise<AxiosResponse> {
  return axios({
    method: 'post',
    url: '/api/userValidate',
    data: {}
  })
}

// 验证用户是否已经登录过了
export function requestUserProfile (): Promise<AxiosResponse> {
  return axios({
    method: 'post',
    url: '/api/userProfile',
    data: {}
  })
}

// 刷新accessToken
export function requestUserRefreshToken (): Promise<AxiosResponse> {
  return axios({
    method: 'post',
    url: '/api/userRefreshToken',
    data: {}
  })
}
