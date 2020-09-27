import { combineReducers } from 'redux'
import { ReducersMapObject } from 'redux'

import authModule, { AuthState } from './modules/auth'

interface Modules {
  authModule: AuthState
}

export interface CommonAction<T = any> {
  type: string
  value?: T
}

const reducersMap: ReducersMapObject<Modules, CommonAction> = {
  authModule,
}

export default combineReducers(reducersMap)
