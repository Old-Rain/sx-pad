import { Reducer } from 'redux'

import { CommonAction } from '@/store/rdrucers'
import { AuthStatus, UserInfo } from './types'
import { USER } from './actionTypes'

export interface UserState {
  /**
   * 鉴权状态
   */
  authStatus: AuthStatus

  /**
   * 用户信息
   */
  userInfo: UserInfo
}

const userState: UserState = {
  authStatus: 0,
  userInfo: {},
}

const userModule: Reducer<UserState, CommonAction> = (state = userState, action) => {
  const { type, value } = action
  const newState = { ...state }

  switch (type) {
    // 更新鉴权状态
    case USER.UPDATE_AUTH_STATUS:
      newState.authStatus = value
      return newState

    // 更新用户信息
    case USER.UPDATE_USER_INFO:
      newState.userInfo = { ...userState.userInfo, ...value }
      return newState

    default:
      return state
  }
}

export default userModule
