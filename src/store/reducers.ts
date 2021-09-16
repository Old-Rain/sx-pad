import { combineReducers } from 'redux'
import { ReducersMapObject } from 'redux'

import authModule, { AuthState } from './modules/auth'
import smartManageBoardModule, { SmartManageBoardState } from './modules/action/smartManageBoard'

// 声明Store下的模块
export interface StoreModules {
  authModule: AuthState
  smartManageBoardModule: SmartManageBoardState
}

// 公共Action
export interface CommonAction<T = any> {
  type: string
  value?: T
}

// 合并各个模块
const reducersMap: ReducersMapObject<StoreModules, CommonAction> = {
  authModule,
  smartManageBoardModule,
}

export default combineReducers(reducersMap)
