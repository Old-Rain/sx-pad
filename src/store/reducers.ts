import { combineReducers } from 'redux'
import { ReducersMapObject } from 'redux'

import authModule, { AuthState } from './modules/auth'
import smartManageBoardModule, { SmartManageBoardState } from './modules/action/smartManageBoard'

interface Modules {
  authModule: AuthState
  smartManageBoardModule: SmartManageBoardState
}

export interface CommonAction<T = any> {
  type: string
  value?: T
}

const reducersMap: ReducersMapObject<Modules, CommonAction> = {
  authModule,
  smartManageBoardModule,
}

export default combineReducers(reducersMap)
