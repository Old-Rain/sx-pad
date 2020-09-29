/**
 * 权限控制
 */

import { Reducer } from 'redux'
import { CommonAction } from '@/store/reducers'

import { getUserInfo } from '@/utils/userInfo'

import { AUTH } from './actionTypes'

export interface AuthState {
  /**
   * 用户权限等级
   */
  authLv: number
}

const authState: AuthState = {
  authLv: getUserInfo().rankCode || 0,
}

const userModule: Reducer<AuthState, CommonAction> = (state = authState, action) => {
  // eslint-disable-next-line
  const { type, value } = action
  const newState = { ...state }

  switch (type) {
    // 更新用户权限等级
    case AUTH.UPDATE_AUTH_LV:
      newState.authLv = getUserInfo().rankCode || 0
      return newState

    default:
      return newState
  }
}

export default userModule
