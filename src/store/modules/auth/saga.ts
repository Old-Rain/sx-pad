import { put } from 'redux-saga/effects'
import { CommonAction } from '@/store/reducers'
import { AUTH } from './actionTypes'
import { Menu, Route } from './types'
import { menuConfig } from './menuConfig'

import { getUserInfo } from '@/utils/userInfo'

// 权限更新
export function* AUTH__UPDATE(action: CommonAction<boolean>) {
  const { value } = action
  const rankCode = +getUserInfo().rankCode!

  // 更新菜单
  const menu: Menu[] = []
  yield put(
    (() => {
      // true更新，false全部卸载
      if (value) {
        for (let i = 0; i <= rankCode; i++) {
          menu.push(...(menuConfig[`auth${i}`] || []))
        }
      }

      return {
        type: AUTH.UPDATE_MENU,
        value: menu,
      }
    })(),
  )

  // 更新路由
  const routes: Route[] = []
  yield put(
    (() => {
      // true更新，false全部卸载
      if (value) {
        routes[0] = { name: '首页', path: '/home' }
      }

      return {
        type: AUTH.UPDATE_ROUTES,
        value: routes,
      }
    })(),
  )
}
