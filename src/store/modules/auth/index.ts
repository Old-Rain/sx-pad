/**
 * 权限控制
 */

import { Reducer } from 'redux'

import { CommonAction } from '@/store/reducers'
import { Menu, Route } from './types'
import { AUTH } from './actionTypes'

export interface AuthState {
  /**
   * 菜单
   */
  menu: Menu[]

  /**
   * 路由
   */
  routes: Route[]
}

const authState: AuthState = {
  menu: [],
  routes: [],
}

const userModule: Reducer<AuthState, CommonAction> = (state = authState, action) => {
  const { type, value } = action
  const newState = { ...state }

  switch (type) {
    // 更新菜单
    case AUTH.UPDATE_MENU:
      newState.menu = { ...authState.menu, ...value }
      return newState

    // 更新路由
    case AUTH.UPDATE_ROUTES:
      newState.routes = { ...authState.routes, ...value }
      return newState

    default:
      return newState
  }
}

export default userModule
