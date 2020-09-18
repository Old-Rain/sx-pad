import axios from 'axios'
import store from '@/store'

const API = axios.create({
  timeout: 20000,
})

// 请求拦截
API.interceptors.request.use(
  (value) => {
    const token = store.getState().userModule.userInfo.token

    if (token) {
      value.headers.Authorization = token
    }

    return value
  },
  (error) => {
    return
  },
)

// 响应拦截
API.interceptors.response.use(
  (value) => {
    return value
  },
  (error) => {
    return
  },
)

export default API.request
