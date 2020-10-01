import request from '@/utils/request'
import { Res } from '@/api/types'
import { LoginData } from './types'

let baseURL = 'http://localhost:3002'

// 登录
export function login<T>(data: LoginData) {
  return request<Res<T>>({
    url: `${baseURL}/mock/login/login.json`,
    method: 'GET',
    data,
  })
}

// 登录二维码
export function loginQRCode<T>() {
  return request<Res<T>>({
    url: `${baseURL}/mock/login/loginQRCode.json`,
    method: 'GET',
  })
}
