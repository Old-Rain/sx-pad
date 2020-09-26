import { combineReducers } from 'redux'
import { ReducersMapObject } from 'redux'

import authModule, { AuthState } from './modules/auth'

interface Modules {
  authModule: AuthState
}

export interface CommonAction {
  type: string
  value?: any
}

const reducersMap: ReducersMapObject<Modules, CommonAction> = {
  authModule,
}

export default combineReducers(reducersMap)
