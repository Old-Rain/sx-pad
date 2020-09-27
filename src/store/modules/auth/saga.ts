import { put } from 'redux-saga/effects'
import { AUTH } from './actionTypes'
import { Menu } from './types'
import { menuConfig } from './menuConfig'

import { getUserInfo } from '@/utils/userInfo'

// 权限更新
export function* AUTH__UPDATE() {
  // 更新菜单
  yield put(
    (() => {
      const rankCode = +getUserInfo().rankCode!
      const value: Menu[] = []

      for (let i = 0; i <= rankCode; i++) {
        value.push(...(menuConfig[`auth${i}`] || []))
      }

      return {
        type: AUTH.UPDATE_MENU,
        value,
      }
    })(),
  )

  // 更新路由
  yield put({
    type: AUTH.UPDATE_ROUTES,
    value: [{ name: '首页', path: '/home' }],
  })
}
