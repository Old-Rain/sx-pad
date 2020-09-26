import { UserInfo } from './types'

/**
 * 保存用户信息
 * @param data 用户信息参数
 */
export function saveUserInfo(data: UserInfo) {
  sessionStorage.setItem('userInfo', JSON.stringify(data))
  sessionStorage.setItem('token', data.token!)
}

/**
 * 清除用户信息
 */
export function clearUserInfo() {
  sessionStorage.removeItem('userInfo')
  sessionStorage.removeItem('token')
}

/**
 * 获取用户信息
 */
export function getUserInfo(): UserInfo {
  try {
    return JSON.parse(sessionStorage.getItem('userInfo')!) || {}
  } catch (error) {
    return {}
  }
}

/**
 * 获取token
 */
export function getToken() {
  return sessionStorage.getItem('token')
}
