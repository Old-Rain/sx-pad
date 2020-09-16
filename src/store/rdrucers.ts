import { combineReducers } from 'redux'
import { ReducersMapObject } from 'redux'

import userModule, { UserState } from './modules/user'

interface Modules {
  userModule: UserState
}

export interface CommonAction {
  type: string
  value?: any
}

const reducersMap: ReducersMapObject<Modules, CommonAction> = {
  userModule,
}

export default combineReducers(reducersMap)
