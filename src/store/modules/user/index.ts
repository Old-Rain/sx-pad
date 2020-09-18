import { Reducer } from 'redux'

import { CommonAction } from '@/store/rdrucers'
import { UserInfo } from './types'
import { USER } from './actionTypes'

export interface UserState {
  /**
   * 用户信息
   */
  userInfo: UserInfo
}

const userState: UserState = {
  userInfo: {},
}

const userModule: Reducer<UserState, CommonAction> = (state = userState, action) => {
  const { type, value } = action
  const newState = { ...state }

  switch (type) {
    // 更新用户信息
    case USER.UPDATE_USER_INFO:
      newState.userInfo = { ...userState.userInfo, ...value }
      return newState

    default:
      return state
  }
}

export default userModule
