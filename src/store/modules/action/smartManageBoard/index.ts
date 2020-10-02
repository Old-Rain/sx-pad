/**
 * 智慧经营看板
 */

import { Reducer } from 'redux'
import { CommonAction } from '@/store/reducers'

import moment from 'moment'
import { DeptIndexRes, SecondaryIndex } from './types'
import { SMART_MANAGE_BOARD } from './actionTypes'

export interface SmartManageBoardState {
  /**
   * 智慧经营看板全局时间
   */
  smartManageBoardMonth: string

  /**
   * 客户经营漏斗指标
   */
  deptIndexResList: DeptIndexRes[]

  /**
   * 客户经营漏斗子指标一维数组
   */
  secondaryIndexList: SecondaryIndex[]
}

const smartManageBoard: SmartManageBoardState = {
  smartManageBoardMonth: moment(Date.now() - 1000 * 60 * 60 * 48).format('YYYY-MM'),
  deptIndexResList: [],
  secondaryIndexList: [],
}

const userModule: Reducer<SmartManageBoardState, CommonAction> = (state = smartManageBoard, action) => {
  const { type, value } = action
  const newState = { ...state }

  switch (type) {
    // 更新智慧经营看板全局时间
    case SMART_MANAGE_BOARD.UPDATE_MONTH:
      newState.smartManageBoardMonth = value
      return newState

    // 更新客户经营漏斗指标
    case SMART_MANAGE_BOARD.UPDATE_DEPT_INDEX:
      newState.deptIndexResList = value.deptIndexResList
      newState.secondaryIndexList = value.secondaryIndexList
      return newState

    default:
      return newState
  }
}

export default userModule
