import axios from 'axios'

const request = axios.create({
  baseURL: '/api', // 所有请求自动加 /api 前缀
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', error)
    alert(error.response?.data?.message || '请求失败')
    return Promise.reject(error)
  }
)

export default request
